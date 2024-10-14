import { auth } from "@/auth"
import { redirect } from "next/navigation";
import ProductForm from "./product-form";

export default async function AddProduct() {
    const session  = await auth();
    if(session?.user.role !== "ADMIN") return redirect("/dashboard/settings")
    return (
        <div>
            <ProductForm />
        </div>
    )
}
