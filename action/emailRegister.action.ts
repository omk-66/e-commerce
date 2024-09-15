"use server";

import prisma from "@/db";
import { actionClient } from "@/safe-action";
import { registerSchema } from "@/types/auth";
import bcrypt from "bcryptjs";

export const emailRegister = actionClient.schema(registerSchema).action(async ({ parsedInput: { username, email, password } }) => {
    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return { success: false, message: "A user with this email already exists." };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: username
            }
        });

        // Return success message
        return { success: true, message: "User registered successfully." };

    } catch (error) {
        console.error("Error during registration:", error);
        return { success: false, message: "An error occurred during registration." };
    }
});
