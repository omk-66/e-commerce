"use server";

import prisma from "@/db";
import { error } from "console";
import crypto from "crypto"; // Assuming you are using Node's crypto module

export async function generateEmailVerificationToken(email: string) {
    try {
        const token = crypto.randomUUID(); // Generate a unique token
        const expires = new Date(new Date().getTime() + 3600 * 1000); // Set token expiry (1 hour)

        // First, check if the email already has a token record
        const existingToken = await prisma.emailVerificationToken.findUnique({
            where: { email } // Use 'email' as the unique field
        });

        if (existingToken) {
            // If token exists for this email, update it
            const updatedToken = await prisma.emailVerificationToken.update({
                where: { email }, // Use 'email' for the unique constraint in the update query
                data: {
                    token,
                    expires
                }
            });
            return updatedToken;
        } else {
            // If no token exists for this email, create a new one
            const newToken = await prisma.emailVerificationToken.create({
                data: {
                    email,
                    token,
                    expires
                }
            });
            return newToken;
        }

    } catch (error) {
        console.error("Error generating email verification token:", error);
        throw new Error("Failed to generate email verification token");
    }
}


export async function newVerification(token:string) {
    const existingToken = await prisma.emailVerificationToken.findFirst({where: token});
    if(!existingToken) return {error: "Token not Found"}

    const hasExpried = new Date(existingToken.expires) < new Date();
    if(hasExpried) return {error: "Token is expired"}

    const existingUser = await prisma.user.findFirst({where:{
        email: existingToken.email
    }});
    if(!existingUser) return {error: "Email dose not extisting"}

    await prisma.user.update({
        where: {
            email: existingToken.email
        },
        data:{
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await prisma.emailVerificationToken.delete({
        where:{
            email: existingToken.email,
        }
    })

    return {success: "Email is verified"}
}