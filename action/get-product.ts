"use server";

import prisma from "@/db";

export async function getProduct(id: number){
    try {
        const product = await prisma.product.findFirst({
            where: {
                id
            }
        });
        if(!product) throw new Error("Producy not found")
        return {success: `Product ${product.title} has been found`,product}
    } catch (error) {
        return {error: "Failed to get product"}
    }
}