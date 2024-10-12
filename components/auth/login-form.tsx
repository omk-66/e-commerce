"use client";
import { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/auth";
import * as z from "zod";
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
import { emailSignin } from "@/action/emailSign.action";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
    const { execute, result, status, isExecuting } = useAction(emailSignin);
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { handleSubmit, control, formState: { isValid, isSubmitting } } = form;

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            await execute(values);
            form.reset();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <CardWrapper
            label="Welcome back!"
            backButtonLabel="Create a new account"
            backButtonHref="/auth/register"
            showSocials
            className="bg-card p-6 rounded-lg shadow-lg"
        >
            <div className="max-w-sm mx-auto">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-foreground">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            disabled={isExecuting}
                                            className="border border-border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-muted-foreground"></FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-foreground">Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                                disabled={isExecuting}
                                                className="border border-border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                            onClick={() => setShowPassword(prev => !prev)}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible className="text-muted-foreground" /> : <AiOutlineEye className="text-muted-foreground" />}
                                        </button>
                                    </div>
                                    <FormDescription className="text-sm text-muted-foreground"></FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button variant={"link"} size={"sm"} className="text-primary hover:text-primary-foreground">
                            Forgot password?
                        </Button>
                        {result.data?.success === false && <FormError message={result.data.message} />}
                        {result.data?.success === true && <FormSuccess message={result.data.message} />}
                        <div className="flex">
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground rounded-md py-3 hover:bg-primary-foreground transition-colors duration-300"
                                disabled={isSubmitting || !isValid}
                            >
                                {isExecuting ? "😆" : "Login"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </CardWrapper>
    );
}
