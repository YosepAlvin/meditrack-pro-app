import Link from "next/link";
import {
  BrainCircuit,
  CalendarDays,
  LayoutDashboard,
  Pill,
  Stethoscope,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Header from "@/components/header";
import ActiveLink from "@/components/active-link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold font-headline">MediTrack Pro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard">
                    <LayoutDashboard />
                    Dasbor Admin
                </ActiveLink>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/manajemen-pengguna">
                    <ShieldCheck />
                    Manajemen Pengguna
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/manajemen-dokter">
                    <Stethoscope />
                    Manajemen Dokter
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/janji-temu">
                    <CalendarDays />
                    Janji Temu
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/pasien">
                    <Users />
                    Pasien
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/obat">
                    <Pill />
                    Obat
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/admin-dashboard/dosis-ai">
                    <BrainCircuit />
                    Dosis AI
                </ActiveLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter/>
      </Sidebar>
      <SidebarInset>
        <Header title="Dasbor Admin" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
