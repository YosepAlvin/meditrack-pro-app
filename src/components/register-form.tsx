"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

const createIdFromName = (name: string, role: string) => {
    const prefix = role === 'dokter' ? 'dr' : 'pat';
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${prefix}-${sanitizedName}`;
}

export function RegisterForm() {
    const [role, setRole] = useState('pasien');
    const [fullName, setFullName] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        if (!fullName.trim()) {
            alert('Nama lengkap harus diisi.');
            return;
        }

        const newId = createIdFromName(fullName, role);
        let path = '';

        if (role === 'pasien') {
            path = `/pasien-dashboard?patient=${newId}&name=${encodeURIComponent(fullName)}`;
        } else if (role === 'dokter') {
            // Untuk dokter, kita butuh spesialisasi. Mari kita buat default.
            const specialty = "Spesialis Umum";
            path = `/dashboard?doctor=${newId}&name=${encodeURIComponent(fullName)}&specialty=${encodeURIComponent(specialty)}`;
        } else {
            path = '/admin-dashboard';
        }

        router.push(path);
    };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 text-left p-0 pb-4">
        <CardTitle className="text-2xl font-headline">Buat sebuah akun</CardTitle>
        <CardDescription>
          Masukkan informasi Anda dan pilih peran Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-0">
        <div className="grid gap-2">
          <Label htmlFor="full-name">Nama Lengkap</Label>
          <Input id="full-name" placeholder="cth., Slamet" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input id="password" type="password" />
        </div>
         <div className="grid gap-2">
          <Label>Peran</Label>
          <RadioGroup defaultValue="pasien" onValueChange={setRole} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pasien" id="r-pasien" />
              <Label htmlFor="r-pasien">Pasien</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dokter" id="r-dokter" />
              <Label htmlFor="r-dokter">Dokter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="r-admin" />
              <Label htmlFor="r-admin">Admin</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-4">
        <Button className="w-full" onClick={handleRegister}>
          Buat Akun
        </Button>
      </CardFooter>
    </Card>
  );
}
