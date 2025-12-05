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
import type { Doctor, Patient } from '@/lib/types';

const getDynamicUser = (searchParams: URLSearchParams): Doctor | Patient | null => {
    const doctorId = searchParams.get('doctor');
    const patientId = searchParams.get('patient');
    const name = searchParams.get('name');

    if (doctorId && name) {
        let doctor = doctors.find(d => d.id === doctorId);
        if (!doctor) {
            // Buat dokter baru secara dinamis jika tidak ditemukan
            const specialty = searchParams.get('specialty') || 'Spesialis Umum';
            doctor = {
                id: doctorId,
                name: name,
                specialty: specialty,
                avatarUrl: `https://picsum.photos/seed/${Buffer.from(name).toString('hex')}/100/100`
            };
        }
        return doctor;
    }

    if (patientId && name) {
        let patient = patients.find(p => p.id === patientId);
        if (!patient) {
            // Buat pasien baru secara dinamis jika tidak ditemukan
            patient = {
                id: patientId,
                name: name,
                email: `${name.split(' ')[0].toLowerCase()}@example.com`,
                avatarUrl: `https://picsum.photos/seed/${Buffer.from(name).toString('hex')}/40/40`,
                lastVisit: new Date().toISOString().split('T')[0]
            };
        }
        return patient;
    }
    
    // Fallback untuk user yang sudah ada
    if (doctorId) return doctors.find(d => d.id === doctorId) || null;
    if (patientId) return patients.find(p => p.id === patientId) || null;

    return null;
}


export default function ClientHeader({ title: defaultTitle }: { title: string }) {
  const searchParams = useSearchParams();
  const user = getDynamicUser(searchParams);

  let title = user?.name || defaultTitle;
  let avatarUrl = user?.avatarUrl || 'https://picsum.photos/seed/100/40/40';
  let avatarFallback = user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD';

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
