"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import { settingsFormSchema } from "@/types/settingsFormSchema";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";

interface SettingsForm {
    session: Session;
}

export default function SettingsCard({ session }: SettingsForm) {
    console.log("seesion is not genrate")
    console.log(session)
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [avatarUploading, setAvtarUploading] = useState(false);

    const form = useForm<z.infer<typeof settingsFormSchema>>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            name: session.user?.name || undefined,
            email: session.user?.email || undefined,
            image: "",
            isTwoFactorEnabled: session.user?.isTwoFactorEnabled || undefined,
            password: undefined,
            newPassword: undefined,
        },
    });

    // Simulated API request to update settings
    async function updateSettings(values: z.infer<typeof settingsFormSchema>) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }

    async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
        console.log(values)
        form.reset();
    }

    return (
        <Card className="max-w-2xl mx-auto border border-gray-200 shadow-lg rounded-lg bg-white">
            <CardHeader className="p-6 border-b border-gray-200">
                <CardTitle className="text-xl font-bold">Your Settings</CardTitle>
                <CardDescription className="text-gray-600">
                    Update your account settings
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 p-2 rounded-md w-full"
                                            placeholder="Enter your name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Avatar Field */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Avatar</FormLabel>
                                    <div className="flex items-center gap-4">
                                        {!form.getValues("image") && (
                                            <div className="font-bold bg-gray-200 text-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
                                                {session.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        {form.getValues("image") && (
                                            <Image
                                                src={form.getValues("image") as string}
                                                alt="user-image"
                                                className="rounded-full"
                                                width={42}
                                                height={42}
                                            />
                                        )}
                                    </div>
                                    <FormControl>
                                        <Input type="hidden" className="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="border border-gray-300 p-2 rounded-md w-full"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New Password Field */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="border border-gray-300 p-2 rounded-md w-full"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Two Factor Authentication */}
                        <FormField
                            control={form.control}
                            name="isTwoFactorEnabled"
                            render={({ field }) => (
                                <FormItem className="flex justify-between items-center">
                                    <FormLabel className="text-sm font-medium">
                                        Two Factor Authentication
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            id="twoFactorSwitch"
                                            className="bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            // {...field}
                                        />
                                    </FormControl>
                                    <label htmlFor="twoFactorSwitch" className="sr-only">
                                        Enable Two Factor Authentication
                                    </label>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Error and Success Messages */}
                        {error && <FormError message={error} />}
                        {success && <FormSuccess message={success} />}

                        {/* Submit Button */}
                        <Button
                            type="submit" >
                            Update Your Settings
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
