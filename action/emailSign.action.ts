"use server";

import prisma from "@/db";
import { actionClient } from "@/safe-action";
import { loginSchema } from "@/types/auth";
import bcrypt from "bcryptjs"; 

export const emailSignin = actionClient.schema(loginSchema).action(async ({ parsedInput: { email, password } }) => {
    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return { success: false, message: "User not found" };
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }

        // If everything is okay, return success
        return { success: true, message: "Login successful", email: existingUser.email };
    } catch (error) {
        console.error("Error during login:", error);
        return { success: false, message: "An error occurred during login" };
    }
});
