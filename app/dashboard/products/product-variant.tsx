"use client";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductVariantType } from "@/lib/infer-types"
import { VariantSchema } from "@/types/variant-schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import InputTags from "./input-tags";
export default function ProductVariant({
    children,
    editMode,
    productID,
    variant,
}: {
    children: React.ReactNode
    editMode: boolean
    productID?: number
    variant?: ProductVariantType
}) {
    const form = useForm<z.infer<typeof VariantSchema>>({
        defaultValues: {
            tags: [],
            VariantImages: [],
            color: "#000000",
            editMode,
            id: undefined,
            productID,
            productType: "Black"
        },
        resolver: zodResolver(VariantSchema),
        mode: "onChange",
    });
    function onSubmit(values: z.infer<typeof VariantSchema>) {
        console.log(values);
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger><PlusCircle className="w-4 h-4 text-primary" /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editMode ? "Edit" : "Create"} your variant</DialogTitle>
                        <DialogDescription>
                            Manage your product variants here. You can add tags, imges, and more.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="productType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variant Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pick a title for your variant" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variant Color</FormLabel>
                                        <FormControl>
                                            <Input type="color"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <InputTags
                                                {...field}
                                                onChange={(e) => field.onChange(e)}
                                                value={field.value.map((item: { tag: string }) => item.tag)} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <VariantImages />  */}
                            {editMode && variant && (
                                <Button type="button" onClick={(e) => e.preventDefault()}>
                                    Delete Variant
                                </Button>
                            )}
                            <Button type="submit">{editMode ? "Update Variant" : "Create Variant"}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
