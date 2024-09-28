import NextAuth from "next-auth"
import authConfig from "./auth.config"
import prisma from "./db"


export const { handlers, signIn, signOut, auth } = NextAuth({
    session:{
        strategy:"jwt"
    },

    ...authConfig
})