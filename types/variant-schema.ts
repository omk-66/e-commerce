import * as z from "zod";

export const VariantSchema = z.object({
    productID: z.number().optional(),
    editMode: z.boolean(),
    productType: z.string().min(3, { message: "Product type must be at least 3 characters" }),
    color: z.string().min(3, { message: "Color must be at least 3 characters long" }),
    VariantImages: z.array(z.object({
        url: z.string().refine((url) => url.search("blob") !== 0, {
            message: "Please wait for the image to upload"
        })
    })),
    size: z.number(),
    key: z.string().optional(),
    id: z.number().optional(),
    name: z.string(),
    tags: z.array(z.object({
        tag: z.string()
    }))
});
