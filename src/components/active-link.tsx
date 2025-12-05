"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function ActiveLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <SidebarMenuButton href={href} asChild isActive={isActive}>
            <Link href={href}>
                {children}
            </Link>
        </SidebarMenuButton>
    );
}
