"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { doctors, patients } from '@/lib/data';

export default function ClientHeader({ title: defaultTitle }: { title: string }) {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctor');
  const patientId = searchParams.get('patient');

  let title = defaultTitle;
  let avatarUrl = 'https://picsum.photos/seed/100/40/40';
  let avatarFallback = 'AD';

  if (doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
        title = doctor.name;
        avatarUrl = doctor.avatarUrl;
        avatarFallback = doctor.name.substring(0, 2).toUpperCase();
    }
  } else if (patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        title = patient.name;
        avatarUrl = patient.avatarUrl;
        avatarFallback = patient.name.substring(0, 2).toUpperCase();
    } else {
        title = "Dasbor Pasien"
    }
  }


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-xl font-semibold md:text-2xl font-headline">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={avatarUrl} alt="Avatar pengguna" data-ai-hint="person portrait" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Buka menu pengguna</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
