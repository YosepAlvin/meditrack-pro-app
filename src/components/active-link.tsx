"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function ActiveLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // Cek apakah href saat ini aktif
    const isActive = pathname === href;

    // Tentukan konteks berdasarkan path URL saat ini
    const isDoctorDashboard = pathname.startsWith('/dashboard');
    const isPatientDashboard = pathname.startsWith('/pasien-dashboard');

    let finalHref = href;

    // HANYA tambahkan query params jika kita berada di konteks yang benar
    // DAN link tujuan juga berada di dalam konteks yang sama.
    if (isDoctorDashboard && href.startsWith('/dashboard')) {
        const doctor = searchParams.get('doctor');
        if (doctor) {
            finalHref = `${href}?doctor=${doctor}`;
        }
    } else if (isPatientDashboard && href.startsWith('/pasien-dashboard')) {
        const patient = searchParams.get('patient');
        if (patient) {
            finalHref = `${href}?patient=${patient}`;
        }
    }
    // Jika kita di admin-dashboard, tidak ada query param yang ditambahkan.
    // `finalHref` akan tetap menjadi `href` asli.

    return (
        <SidebarMenuButton href={finalHref} asChild isActive={isActive}>
            <Link href={finalHref}>
                {children}
            </Link>
        </SidebarMenuButton>
    );
}
