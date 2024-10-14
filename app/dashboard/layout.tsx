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
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <nav className="w-full bg-white space-x-4 py-4">
                <div className="container mx-auto px-4">
                    <ul className="flex justify-center gap-6 text-sm font-semibold text-gray-700">
                        <DashboardNavbar allLinks={allLinks}/>
                    </ul>
                </div>
            </nav>
            <main className="flex-grow w-full container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
