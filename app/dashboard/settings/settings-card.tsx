"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
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
import { useAction } from "next-safe-action/hooks";
import { settings } from "@/action/settings";
import { UploadButton } from "@uploadthing/react";

interface SettingsForm {
    session: Session;
}

export default function SettingsCard({ session }: SettingsForm) {
    const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(settings);

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

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

    async function onSubmit(values: z.infer<typeof settingsFormSchema>) {
        setError(undefined);
        setSuccess(undefined);
        execute(values);

        if (hasSucceeded) {
            setSuccess(result.data?.success);
            form.reset();
        }
        if (hasErrored) {
            setError(result.data?.error);
        }
    }

    return (
        <Card className="max-w-lg mx-auto border border-gray-200 shadow-lg rounded-lg bg-white my-5 p-7">
            <CardHeader className="p-4 border-b border-gray-200">
                <CardTitle className="text-lg font-bold">Your Settings</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                    Update your account settings
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 p-3 rounded-md w-full"
                                            placeholder="Enter your name"
                                            disabled={isExecuting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Avatar</FormLabel>
                                    <div className="flex items-center gap-3">
                                        {!form.getValues("image") && (
                                            <div className="font-bold bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                                                {session.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        {form.getValues("image") && (
                                            <Image
                                                src={form.getValues("image") as string}
                                                alt="user-image"
                                                className="rounded-full"
                                                width={40}
                                                height={40}
                                            />
                                        )}
                                        <UploadButton
                                        className="ut-button:ring-primary"
                                            endpoint="avtarUploader"
                                            content={{
                                                button({ready}) {
                                                    if (ready) return <div>Change Avatar</div>;
                                                    return <div>Uploading...</div>;
                                                }
                                            }}
                                        />
                                    </div>
                                    <FormControl>
                                        <Input type="hidden" className="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="border border-gray-300 p-3 rounded-md w-full"
                                            placeholder="********"
                                            disabled={isExecuting || session.user.isOAuth}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="border border-gray-300 p-3 rounded-md w-full"
                                            placeholder="********"
                                            disabled={isExecuting || session.user.isOAuth}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isTwoFactorEnabled"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">Two Factor Authentication</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isExecuting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && <FormError message={error} />}
                        {success && <FormSuccess message={success} />}

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground rounded-md py-3  transition-colors duration-300"
                                disabled={isExecuting}
                            >
                                {isExecuting ? "Updating..." : "Update Settings"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
