"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function ActiveLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const isActive = pathname === href;

    // Tentukan konteks saat ini berdasarkan URL
    const isAdminDashboard = pathname.startsWith('/admin-dashboard');
    const isDoctorDashboard = pathname.startsWith('/dashboard');
    const isPatientDashboard = pathname.startsWith('/pasien-dashboard');

    let finalHref = href;

    // Tambahkan query params hanya jika kita berada di dashboard yang relevan
    if (isDoctorDashboard) {
        const doctor = searchParams.get('doctor');
        if (doctor) {
            finalHref = `${href}?doctor=${doctor}`;
        }
    } else if (isPatientDashboard) {
        const patient = searchParams.get('patient');
        if (patient) {
            finalHref = `${href}?patient=${patient}`;
        }
    }
    // Jika kita di admin dashboard (isAdminDashboard), finalHref akan tetap menjadi href asli tanpa query param tambahan.

    return (
        <SidebarMenuButton href={finalHref} asChild isActive={isActive}>
            <Link href={finalHref}>
                {children}
            </Link>
        </SidebarMenuButton>
    );
}
