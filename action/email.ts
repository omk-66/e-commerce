"use server";

import getBaseurl from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseurl();
export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Confirmation Email',
        html: `<p>Click to <a href='${confirmLink}'>Confirm your email</a></p>`
        // react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
        console.log(error);
    }

    if(data){
        console.log(data);
    }
}