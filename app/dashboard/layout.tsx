import { auth } from "@/auth";
import { FaBars, FaPenSquare, FaTruck } from "react-icons/fa";
import { FcPackage, FcSettings } from "react-icons/fc";
import { DashboardNavbar } from "@/components/navigation/dashborad-nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    const userLinks = [
        {
            label: "Orders",
            path: "/dashboard/orders",
            icon: <FaTruck size={15} />
        },
        {
            label: "Settings",
            path: "/dashboard/settings",
            icon: <FcSettings size={15} />
        }
    ] as const;

    const adminLinks = session?.user.role === "ADMIN" ? [
        {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <FaBars size={15} />
        },
        {
            label: "Create",
            path: "/dashboard/add-product",
            icon: <FaPenSquare size={15} />
        },
        {
            label: "Products",
            path: "/dashboard/products",
            icon: <FcPackage size={15} />
        }
    ] : [];

    const allLinks = [...adminLinks, ...userLinks];

    return (
        <div>
            <nav className="py-2 overflow-auto">
                <ul className="flex gap-6 text-sm font-bold">
                    <DashboardNavbar allLinks={allLinks}/>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
}
