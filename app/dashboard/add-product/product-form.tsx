"use client";

import { ProductSchema, zProductSchema } from "@/types/product-schems";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaRupeeSign } from "react-icons/fa";
import Tiptap from "./tiptap";
import { createProduct } from "@/action/create-product";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { error } from "console";

export default function ProductForm() {
    const router = useRouter();
    const { execute, result, isExecuting, status } = useAction(createProduct, {
        onSuccess: (data) => {
            if (data.data?.success) {
                console.log(data.data.success)
                router.push("/dashboard/products");
                toast.success(data.data?.success);
            }
        },
        onError: (error) => {
            toast.error(result.data?.error)
        },
        onExecute:(data) => {
            toast.loading("Creating Product")
        },
    });

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
        },
        resolver: zodResolver(ProductSchema),
        mode: "onChange"
    });

    function onSubmit(values: zProductSchema) {
        execute(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
                <CardDescription>Fill in the details to create a new product</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product title" {...field} disabled={status === "executing"} />
                                        </FormControl>
                                        <FormDescription>
                                            {/* The name of your product. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Tiptap val={field.value} disabled={status === "executing"} />
                                        </FormControl>
                                        <FormDescription>
                                            {/* Brief description of the product. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price Field */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center space-x-2">
                                                <FaRupeeSign size={15} className=" text-primary" />
                                                <Input
                                                    disabled={status === "executing"}
                                                    type="number"
                                                    min={0}
                                                    placeholder="Product price"
                                                    {...field}
                                                    // Convert the input value from string to number before validation
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    value={field.value}
                                                    className="w-full"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            {/* Enter the product price in INR. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <Button disabled={status === "executing" || !form.formState.isValid || !form.formState.isDirty} type="submit">
                                Submit
                            </Button> */}
                            <Button disabled={status === "executing"} type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
}
