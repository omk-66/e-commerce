"use client";
import { User } from "next-auth";
import { signOut, signIn } from "next-auth/react";
import { FaTruck } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoLogOut } from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface UserButtonProps {
    user?: User;
}

export function UserButton({ user }: UserButtonProps) {
    const router = useRouter();

    return (
        <>
            {user ? (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <Avatar className="cursor-pointer">
                            {user.image ? (
                                <AvatarImage src={user.image} alt={`${user.name} Avatar`} />
                            ) : (
                                <AvatarFallback className="bg-primary/25 text-primary font-semibold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-70 p-2 bg-white border border-gray-300 shadow-lg space-y-2 rounded-md" align="end">
                        <DropdownMenuLabel className="flex flex-col items-start space-y-1">
                            <div className="flex items-center space-x-2 bg-primary/10 p-2 rounded-md">
                                <Avatar>
                                    {user.image ? (
                                        <AvatarImage src={user.image} alt={`${user.name} Avatar`} />
                                    ) : (
                                        <AvatarFallback className="bg-primary/25 text-primary font-semibold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => router.push("/dashboard/orders")}
                            className="group flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 rounded hover:bg-gray-100 ease-in-out">
                            <FaTruck className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                            My Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => router.push("/dashboard/settings")}
                            className="group flex items-center gap-2 p-2 cursor-pointer transition-all duration-300 rounded hover:bg-gray-100 ease-in-out">
                            <FcSettings className="group-hover:rotate-180 transition-transform duration-300" size={16} />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => signOut()}
                            className="group flex items-center gap-2 p-2 hover:text-red-600 cursor-pointer transition-transform duration-300 rounded bg-red-100"
                        >
                            <IoLogOut size={16} className="group-hover:scale-110 transition-transform duration-300" />
                            <span className="transition-colors duration-300">Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button onClick={() => signIn()}>Login</Button>
            )}
        </>
    );
}
