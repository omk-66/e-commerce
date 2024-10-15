"use server";

import { actionClient } from "@/safe-action";
import prisma from "@/db";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const deleteProducatSchema = z.object({
    id:z.number()
});

export const deleteProducat = actionClient
.schema(deleteProducatSchema)
.action(async ({ parsedInput }) => {
    const {id} = parsedInput;
    try {
        const product = await prisma.product.delete({
            where: {
                id
            }
        });
        revalidatePath("/dashboard/products");
        return {success: `Producat ${product.title} has been deleted`}
    } catch (error) {
        return {error: "Faild to delete product"}
    }
})