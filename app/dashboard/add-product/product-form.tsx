"use client";
import { ProductSchema, zProductSchema } from "@/types/product-schems";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";  // Import MoonLoader
// import prisma from "@/db";
import { getProduct } from "@/action/get-product";
// import { revalidatePath } from "next/cache";

export default function ProductForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editMode = searchParams.get("id");

    const checkProduct = async (id: number) => {
        if (editMode) {
            const { product, error, success } = await getProduct(id);
            if (error) {
                toast.error(error);
                router.push("/dashboard/products");
                return
            }

            if (success) {
                const id = parseInt(editMode);
                form.setValue("title", product.title);
                form.setValue("description", product.description);
                form.setValue("price", product.price);
                form.setValue("id", parseInt(editMode))
            }
        }
    }

    useEffect(() => {
        if (editMode) {
            checkProduct(parseInt(editMode))
        }
    }, [editMode])

    const form = useForm({
        defaultValues: {
            id: editMode ? parseInt(editMode) : undefined,
            title: "",
            description: "",
            price: 0,
        },
        resolver: zodResolver(ProductSchema),
        mode: "onChange",
    });

    const { execute, result, isExecuting, status } = useAction(createProduct, {
        onSuccess: (data) => {
            toast.dismiss();
            if (data.data?.success) {
                router.push("/dashboard/products");
                toast.success(data.data?.success);
            }
        },
        onError: () => {
            toast.dismiss();
            toast.error(result.data?.error);
        },
        onExecute: () => {
            toast.loading(editMode ? "Updating Product" : "Creating Product");
        },
    });

    function onSubmit(values: zProductSchema) {
        execute(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{editMode ? "Edit Product" : "Create Product"}</CardTitle>
                <CardDescription>Fill in the details {editMode ? "to edit" : "to create"} the product</CardDescription>
            </CardHeader>
            <CardContent>
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
                                            <FaRupeeSign size={15} className="text-primary" />
                                            <Input
                                                disabled={status === "executing"}
                                                type="number"
                                                min={0}
                                                placeholder="Product price"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                value={field.value}
                                                className="w-full"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button with Loader */}
                        <Button disabled={status === "executing"} type="submit" className="w-full">
                            {isExecuting ? (
                                <div className="flex items-center space-x-2">
                                    <MoonLoader size={20} color="#fff" />  {/* Loader inside the button */}
                                    <span>{editMode ? "Updating..." : "Submitting..."}</span>
                                </div>
                            ) : (
                                <span>{editMode ? "Update" : "Submit"}</span>
                            )}
                        </Button>

                        {/* Submit Button */}
                        {/* <Button disabled={status === "executing"} type="submit">
                            {editMode ? "Update" : "Submit"}
                        </Button> */}
                    </form>
                </Form>
            </CardContent>
            <CardFooter>Card Footer</CardFooter>
        </Card>
    );
}
