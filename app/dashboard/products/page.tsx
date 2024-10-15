import prisma from "@/db"
import placeholder from "@/public/place_holder.png"
import {DataTable} from "./data-table";
import { columns } from "./columns";

export default async function Products() {
    const products = await prisma.product.findMany({
        orderBy: {
            id: "asc"
        }
    });

    if (!products) throw new Error("No products found");
    const dataTable = products.map((product) => {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            variants: [],
            image: placeholder.src
        }
    });
    if (!dataTable) throw new Error("DataTable is not found")
    return (
        <div>
            <DataTable data={dataTable} columns={columns} />
        </div>
    )
}
