"use client";
import { motion } from "framer-motion";
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
                    <motion.li
                        key={index}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <Link
                            href={link.path}
                            className={cn(
                                "flex flex-col gap-1 items-center",
                                pathname === link.path ? "text-primary" : "text-muted"
                            )}
                        >
                            {link.icon}
                            {link.label}

                            {/* Animated bottom line */}
                            {pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-[-2px] h-[3px] w-full bg-primary"
                                    initial={false} // Let the layout animation take full control
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}
