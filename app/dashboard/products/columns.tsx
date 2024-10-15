"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"
// import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/action/create-product"
import { deleteProducat } from "@/action/delete-producat"
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
