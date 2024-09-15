"use client";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";



export function ShowSocials() {
    return (
        <div className="w-full">
            <ul className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => signIn("google", {
                    redirect: false,
                    callbackUrl: "/"
                })} className="flex gap-2"><FcGoogle size={20}/><span>Sign in with Google</span></Button>
                <Button variant="outline" onClick={() => signIn("github", {
                    redirect: false,
                    callbackUrl: "/"
                })} className="flex gap-2"><FaGithub size={20} /><span>Sign in with Github</span></Button>
            </ul>
        </div>
    )
}

