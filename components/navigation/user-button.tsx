"use client";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

interface UserButtonProps {
    user?: Session['user'];
}

export function UserButton({ user }: UserButtonProps) {
    return (
        <div>
            {user ? (
                <div>{user.email}</div>
            ) : null}

            {!user ? (
                <Link href="api/auth/signin/">
                    <Button className="flex gap-2">
                        <IoLogInOutline size={30}/>
                        <span>Sign in</span>
                    </Button>
                </Link>
            ) : (
                <div>
                    <Button onClick={() => signOut()}>Sign out</Button>
                </div>
            )}
        </div>
    );
}
