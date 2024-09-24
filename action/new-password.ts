"use server";

import prisma from "@/db";
import { actionClient } from "@/safe-action";
import { newPasswordSchema } from "@/types/auth";
import bcrypt from "bcryptjs";

export const newPassword = actionClient.schema(newPasswordSchema).action(async ({ parsedInput }) => {
    const { password, token } = parsedInput;
    if (!token) {
        return { error: "Missing token" };
    }
    
    const existingToken = await prisma.passwordResetTokens.findFirst({
        where: {
            token,
        },
    });

    if (!existingToken) {
        return { error: "Token not found" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired" };
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: existingToken.email,
        },
    });

    if (!existingUser) {
        return { error: "User not found" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    password: hashPassword,
                },
            });
            await tx.passwordResetTokens.delete({
                where: {
                    id: existingToken.id,
                },
            });
        });

        return { success: "Password updated" };
    } catch (error) {
        console.error("Transaction failed:", error);
        return { error: "Failed to update password" };
    }
});
