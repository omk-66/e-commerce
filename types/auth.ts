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
