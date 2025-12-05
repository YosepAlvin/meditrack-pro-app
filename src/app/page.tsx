import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <div className="bg-primary p-3 rounded-full">
                    <Stethoscope className="w-8 h-8 text-primary-foreground" />
                </div>
            </div>
          <CardTitle className="text-3xl font-headline">MediTrack Pro</CardTitle>
          <CardDescription>
            Solusi manajemen klinik lengkap Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
          <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
            Dengan mengklik lanjutkan, Anda menyetujui{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Ketentuan Layanan
            </Link>{' '}
            kami dan{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Kebijakan Privasi
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
