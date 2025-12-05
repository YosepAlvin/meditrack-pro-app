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

export default function ClientHeader({ title: defaultTitle }: { title: string }) {
  const searchParams = useSearchParams();
  const doctor = searchParams.get('doctor');

  const getDoctorName = () => {
    if (doctor === 'dr-wahyu') return 'Dr. Wahyu';
    if (doctor === 'dr-indah') return 'Dr. Indah';
    if (doctor === 'dr-gunawan') return 'Dr. Gunawan';
    return defaultTitle;
  }
  
  const getAvatarFallback = () => {
    if (doctor === 'dr-wahyu') return 'DW';
    if (doctor === 'dr-indah') return 'DI';
    if (doctor === 'dr-gunawan') return 'DG';
    return 'AD';
  }

  const getAvatarUrl = () => {
    if (doctor === 'dr-wahyu') return 'https://picsum.photos/seed/101/40/40';
    if (doctor === 'dr-indah') return 'https://picsum.photos/seed/102/40/40';
    if (doctor === 'dr-gunawan') return 'https://picsum.photos/seed/103/40/40';
    return 'https://picsum.photos/seed/100/40/40';
  }

  const title = getDoctorName();

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
                <AvatarImage src={getAvatarUrl()} alt="Avatar pengguna" data-ai-hint="person portrait" />
                <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
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
