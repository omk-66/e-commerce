"use server";

import { auth } from "@/auth"; 
import prisma from "@/db"; 
import { actionClient } from "@/safe-action"; 
import { settingsFormSchema } from "@/types/settingsFormSchema"; 
import bcrypt from "bcryptjs"; 
import { revalidatePath } from "next/cache"; 

// Define the settings action using the action client
export const settings = actionClient
    .schema(settingsFormSchema) // Apply the validation schema
    .action(async (values) => {
        // Authenticate the user
        const user = await auth();
        if (!user) {
            return { error: "User not found" }; // Return error if user is not authenticated
        }

        // Fetch the user from the database
        const dbUser = await prisma.user.findFirst({
            where: {
                id: user.user.id, // Use authenticated user's ID
            }
        });

        if (!dbUser) {
            return { error: "User not found" }; // Return error if user does not exist in the database
        }

        // If the user is authenticated via OAuth, don't allow email/password changes
        if (user.user.isOAuth) {
            values.parsedInput.email = undefined;
            values.parsedInput.password = undefined;
            values.parsedInput.newPassword = undefined;
            values.parsedInput.isTwoFactorEnabled = undefined;
        }

        // Check if the current password and new password are provided
        if (values.parsedInput.password && values.parsedInput.newPassword && dbUser.password) {
            const passwordMatch = await bcrypt.compare(values.parsedInput.password, dbUser.password);

            if (!passwordMatch) {
                return { error: "Password does not match" }; // Return error if the current password is incorrect
            }

            const samePassword = await bcrypt.compare(values.parsedInput.newPassword, dbUser.password);

            if (samePassword) {
                return { error: "New password is the same as the old password" }; // Return error if new password is the same as old
            }

            // Hash the new password
            const newHashPassword = await bcrypt.hash(values.parsedInput.newPassword, 10);

            // Update the parsed input with the new hashed password
            values.parsedInput.password = newHashPassword;
            values.parsedInput.newPassword = undefined; // Clear the new password field

            // Update the user's information in the database
            const updateUser = await prisma.user.update({
                where: {
                    id: user.user.id // Specify which user to update
                },
                data: {
                    password: values.parsedInput.password,
                    email: values.parsedInput.email,
                    image: values.parsedInput.image,
                    TwoFactorEnabled: values.parsedInput.isTwoFactorEnabled,
                    name: values.parsedInput.name,
                }
            });

            // Revalidate the path to ensure updated data is reflected
            revalidatePath("/dashboard/settings", "page");
            return {
                success: "Settings updated" // Return success message
            };
        }
    });
