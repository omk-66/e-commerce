"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon, PlusCircle } from "lucide-react"
// import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/action/create-product"
import { deleteProducat } from "@/action/delete-producat"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import { ProductVariantType } from "@/lib/infer-types"
import ProductVariant from "./product-variant"

interface ProductColums {
    id: number,
    title: string,
    price: number,
    variants: any,
    image: string
}

async function deleteProducatWrapper(id: number) {
    const data = await deleteProducat({ id });
    if (!data) return new Error("No data found")
    if (data.data?.success) {
        toast.success(data.data.success)
    }
    if (data.data?.error) {
        toast.error(data.data.error)
    }
}


// const { execute, status, result, isExecuting } = useAction(deleteProducat, {
//     onSuccess: (data) => {
//         if (data.data?.success) {
//             toast.success(data.data.success)
//         }
//         if (data.data?.error) {
//             toast.error(data.data.error)
//         }
//     },
//     onExecute: (data) => {
//         toast.loading("Deleting Product")
//     },
// })

export const columns: ColumnDef<ProductColums>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "variants",
        header: "Variants",
        cell: ({ row }) => {
            const variants = row.getValue("variants") as ProductVariantType[]; // Ensure type assertion
            return (
                <div>
                    {variants.map((variant) => ( 
                        <div key={variant.id}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ProductVariant productID={variant.id} variant={variant} editMode={true}>
                                            <div className="w-5 h-5 rounded-full" key={variant.id} style={{
                                                background: variant.color
                                            }}/>
                                        </ProductVariant>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{variant.productType}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* <span className="text-primary"><PlusCircle className="w-4 h-4" /></span> */}
                                <span>
                                <ProductVariant editMode={false} >
                                    <PlusCircle className="h-5 w-5"/>
                                </ProductVariant>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create a new variant</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(price);

            return <div className="font-medium text-sm">{formatted}</div>;
        }
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const cellImage = row.getValue("image") as string;
            const cellTitle = row.getValue("title") as string;
            return (
                <div>
                    <Image src={cellImage} alt={cellTitle} width={50} height={50} className="rounded-md" />
                </div>
            )
        }
    },
    {
        id: "action",
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant={"ghost"} className="p-0 h-8 w-8">
                        <MoreHorizontalIcon className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="focus:bg-primary/50 cursor-pointer" ><Link href={`/dashboard/add-product?id=${product.id}`}>Edit Product</Link></DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-destructive/50 cursor-pointer"
                            onClick={() => deleteProducatWrapper(product.id)} >Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
