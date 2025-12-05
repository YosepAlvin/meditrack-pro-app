import Link from "next/link";
import {
  BrainCircuit,
  CalendarDays,
  LayoutDashboard,
  Pill,
  Stethoscope,
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
import ActiveLink from "@/components/active-link";
import ClientHeader from "@/components/client-header";

export default function DashboardLayout({
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
                <ActiveLink href="/dashboard">
                    <LayoutDashboard />
                    Dasbor Dokter
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/dashboard/janji-temu">
                    <CalendarDays />
                    Janji Temu
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/dashboard/pasien">
                    <Users />
                    Pasien
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/dashboard/obat">
                    <Pill />
                    Obat
                </ActiveLink>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ActiveLink href="/dashboard/dosis-ai">
                    <BrainCircuit />
                    Dosis AI
                </ActiveLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter/>
      </Sidebar>
      <SidebarInset>
        <ClientHeader title="Dasbor Dokter" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
