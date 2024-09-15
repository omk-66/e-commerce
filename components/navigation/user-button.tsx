"use client";

import { User } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

// Define props type to expect only user
interface UserButtonProps {
    user?: User;
}

export function UserButton({ user }: UserButtonProps) {
    return (
        <div>
            {/* Display user email if available */}
            {user ? (
                <div>{user.email}</div>
            ) : null}

            {/* Conditionally render sign-in or sign-out button */}
            {!user ? (
                <Link href="api/auth/signin/">
                    <Button className="flex gap-2">
                        <IoLogInOutline size={15}/>
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
