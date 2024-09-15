import * as z from "zod";

// Update schema to reflect common practices for login forms
export const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required") 
        .max(50, "Email must be at most 50 characters long") 
        .email("Invalid email address"), 
    password: z.string()
        .min(6, "Password must be at least 6 characters long") 
});


export const registerSchema = z.object({
    username: z.string()
        .min(1, "Username must be at least 1 characters long")
        .max(30, "Username must be at most 30 characters long"),
    email: z.string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
});