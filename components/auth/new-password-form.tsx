"use client";
import { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { newPasswordSchema } from "@/types/auth";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAction } from "next-safe-action/hooks";
import { newPassword } from "@/action/new-password";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function NewPasswordForm() {
    const { execute, result, status, isExecuting } = useAction(newPassword);
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            token: "",
            password: ""
        }
    });

    const { handleSubmit, control, formState: { isValid, isSubmitting } } = form;

    const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
        try {
            await execute(values);
            form.reset();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <CardWrapper
            label="Reset Password"
            backButtonLabel="back to home!"
            backButtonHref="/"
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <div className="max-w-sm mx-auto">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={control}
                            name="token"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-gray-800">Token</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your token"
                                            {...field}
                                            disabled={isExecuting}
                                            value={field.value || ""}
                                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500"></FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-gray-800">Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                                disabled={isExecuting}
                                                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                            onClick={() => setShowPassword(prev => !prev)}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible className="text-gray-500" /> : <AiOutlineEye className="text-gray-500" />}
                                        </button>
                                    </div>
                                    <FormDescription className="text-sm text-gray-500"></FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* <Button variant={"link"} size={"sm"} className="text-violet-500 hover:text-violet-700">
                            Forgot password?
                        </Button> */}
                        {result.data?.success && <FormSuccess message={result.data.success} />}
                        {result.data?.error && <FormError message={result.data.error} />}

                        <div className="flex">
                            <Button
                                type="submit"
                                className="w-full bg-violet-600 text-white rounded-md py-3 hover:bg-violet-700 transition-colors duration-300"
                                disabled={isSubmitting || !isValid}
                            >
                                {isExecuting ? "😆" : "Update"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </CardWrapper>
    );
}
