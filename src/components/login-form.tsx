"use client";

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

export function LoginForm() {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 text-left p-0 pb-4">
        <CardTitle className="text-2xl font-headline">Selamat Datang Kembali</CardTitle>
        <CardDescription>
          Masukkan email Anda di bawah ini untuk masuk ke akun Anda.
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
      <CardFooter className="p-0 pt-4">
        <Button className="w-full" asChild>
          <Link href="/dashboard">Masuk</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
