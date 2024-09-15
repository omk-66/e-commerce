"use client";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
export function UserButton({user}: Session) {
    return (
        <div>
            <div>{user?.email}</div>
            <div><Button onClick={() => signOut()}>Sign out</Button></div>
        </div>
    )
}

