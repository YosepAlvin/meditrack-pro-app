"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function ActiveLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const doctor = searchParams.get('doctor');
    const patient = searchParams.get('patient');

    const isActive = pathname === href;
    
    let finalHref = href;
    if (doctor) {
        finalHref = `${href}?doctor=${doctor}`;
    } else if (patient) {
        finalHref = `${href}?patient=${patient}`;
    }

    return (
        <SidebarMenuButton href={finalHref} asChild isActive={isActive}>
            <Link href={finalHref}>
                {children}
            </Link>
        </SidebarMenuButton>
    );
}
