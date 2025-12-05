import Link from "next/link";
import {
  CalendarPlus,
  HeartPulse,
  LayoutDashboard,
  Rocket,
  ScrollText,
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

export default function PasienDashboardLayout({
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
                <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold font-headline">MediTrack Pro</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <ActiveLink href="/pasien-dashboard">
                    <LayoutDashboard />
                    Dasbor Pasien
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/pasien-dashboard/janji-temu">
                    <CalendarPlus />
                    Janji Temu
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/pasien-dashboard/riwayat-medis">
                    <ScrollText />
                    Riwayat Medis
                </ActiveLink>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <ActiveLink href="/pasien-dashboard/kesehatan">
                    <HeartPulse />
                    Data Kesehatan
                </ActiveLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter/>
      </Sidebar>
      <SidebarInset>
        <Header title="Dasbor Pasien" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
