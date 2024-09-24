import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import { loginSchema } from "./types/auth"
import bcrypt from "bcryptjs"

export default {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            authorize: async (credentials) => {
                const validatedFields = loginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    throw new Error("Invalid credentials");
                }

                const { email, password } = validatedFields.data;

                // Find user by email
                const user = await prisma.user.findFirst({
                    where: { email }
                });

                if (!user || !user.password) {
                    throw new Error("User not found or password not set");
                }

                // Compare passwords
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    throw new Error("Incorrect password");
                }

                return user; 
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    }
} satisfies NextAuthConfig;
