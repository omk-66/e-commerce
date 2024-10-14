"use client"
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LinkItem {
    label: string;
    path: string;
    icon: JSX.Element;
}

interface AllLinks {
    allLinks: LinkItem[];
}

export function DashboardNavbar({ allLinks }: AllLinks) {
    const pathname = usePathname();

    return (
        <div className="relative">
            <ul className="flex gap-6 text-sm font-bold">
                {allLinks.map((link, index) => (
                    <motion.li whileTap={{
                        scale: 0.95
                    }}  key={index} className="relative">
                        <Link href={link.path} className={cn("flex flex-col gap-1 items-center", pathname === link.path ? "text-primary" : "text-muted")}>
                            {link.icon}
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}
