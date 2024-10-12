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
                    <li key={index} className="relative">
                        <Link href={link.path} className={cn("flex flex-col gap-1 items-center", pathname === link.path ? "text-primary" : "text-muted")}>
                            {link.icon}
                            {link.label}
                        </Link>
                        {/* Motion indicator for active link */}
                        {pathname === link.path && (
                            <motion.div className="h-[3px] w-full rounded-full absolute bg-primary z-0 left-0" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
