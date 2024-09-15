"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/auth";
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
import * as z from "zod";
import { useAction } from "next-safe-action/hooks";
import { emailSignin } from "@/action/emailSign.action";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export default function LoginForm() {
    const { execute, result, status, isExecuting } = useAction(emailSignin);
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
            backButtonHref="/"
            showSocials
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <div className="max-w-sm mx-auto">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-gray-800">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            disabled={isExecuting}
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
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                            disabled={isExecuting}
                                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500"></FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <Button variant={"link"} size={"sm"} className="text-violet-500 hover:text-violet-700">
                            Forgot password?
                        </Button>
                        {result.data?.success === false && <FormError message={result.data.message} />}
                        {result.data?.success === true && <FormSuccess message={result.data.message} />}
                        <div className="flex">
                            <Button
                                type="submit"
                                className="w-full bg-violet-600 text-white rounded-md py-3 hover:bg-violet-700 transition-colors duration-300"
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
