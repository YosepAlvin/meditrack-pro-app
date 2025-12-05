"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type NewUser = {
  id: string;
  name: string;
  role: 'dokter' | 'pasien';
  specialty?: string;
};

export function LoginForm() {
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);

  useEffect(() => {
    // Client-side only: access localStorage
    const storedUsers = localStorage.getItem('newUsers');
    if (storedUsers) {
      setNewUsers(JSON.parse(storedUsers));
    }
  }, []);

  const createLoginLink = (user: NewUser) => {
    if (user.role === 'dokter') {
      return `/dashboard?doctor=${user.id}&name=${encodeURIComponent(user.name)}&specialty=${encodeURIComponent(user.specialty || 'Spesialis Umum')}`;
    }
    return `/pasien-dashboard?patient=${user.id}&name=${encodeURIComponent(user.name)}`;
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 text-left p-0 pb-4 pt-4">
        <CardTitle className="text-2xl font-headline">Selamat Datang Kembali</CardTitle>
        <CardDescription>
          Pilih peran Anda untuk masuk.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-0">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-0 pt-4">
        <div className="relative w-full">
            <Separator className="my-2" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">Masuk sebagai</span>
        </div>

        <Button className="w-full" asChild>
          <Link href="/admin-dashboard">Admin</Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href="/dashboard?doctor=dr-wahyu&name=Dr.%20Wahyu&specialty=Spesialis%20Kardiologi">Dokter Wahyu</Link>
        </Button>
         <Button className="w-full" asChild>
          <Link href="/dashboard?doctor=dr-indah&name=Dr.%20Indah&specialty=Spesialis%20Neurologi">Dokter Indah</Link>
        </Button>
         <Button className="w-full" asChild>
          <Link href="/dashboard?doctor=dr-gunawan&name=Dr.%20Gunawan&specialty=Spesialis%20Pediatri">Dokter Gunawan</Link>
        </Button>
        <div className="relative w-full">
            <Separator className="my-2" />
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/pasien-dashboard?patient=1&name=Budi%20Sanjoyo">Pasien Budi Sanjoyo</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/pasien-dashboard?patient=2&name=Siti%20Aminah">Pasien Siti Aminah</Link>
        </Button>
        
        {/* Render buttons for dynamically created users */}
        {newUsers.length > 0 && <Separator className="my-2" />}
        {newUsers.map(user => (
           <Button key={user.id} variant={user.role === 'dokter' ? 'default' : 'outline'} className="w-full" asChild>
             <Link href={createLoginLink(user)}>
                {user.role === 'dokter' ? `Dokter ${user.name}` : `Pasien ${user.name}`}
             </Link>
           </Button>
        ))}

      </CardFooter>
    </Card>
  );
}
