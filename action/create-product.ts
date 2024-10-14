"use server";

import { ProductSchema } from "@/types/product-schems";
import { actionClient } from "@/safe-action";
import prisma from "@/db";


export const createProduct = actionClient.schema(ProductSchema).action(async ({ parsedInput }) => {
    const { description, price, title, id } = parsedInput;
    try {
        if (id) {
            const currentProducts = await prisma.product.findFirst({
                where: {
                    id
                }
            });
            if (!currentProducts) return { error: "Product not found" }

            const editedProduct = await prisma.product.update({
                where: {
                    id
                },
                data: {
                    price,
                    description,
                    title
                }
            });

            return { success: `${editedProduct.title} updated!` }
        } else {

            const newProduct = await prisma.product.create({
                data: {
                    title,
                    price,
                    description
                }
            });


            return { success: `${newProduct.title} added!` }



        }
    } catch (error) {
        return { error: JSON.stringify(error) }
    }
})