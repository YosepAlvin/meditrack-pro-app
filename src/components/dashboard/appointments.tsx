
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Appointment } from "@/lib/types"
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusVariant = (status: Appointment['status']) => {
  switch (status) {
    case 'Terkonfirmasi':
      return 'default';
    case 'Menunggu':
      return 'secondary';
    case 'Dibatalkan':
      return 'destructive';
    case 'Selesai':
        return 'outline';
    case 'Dipanggil':
        return 'default'; // Or another color
    default:
      return 'outline';
  }
}

export default function Appointments() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctor');
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      setIsLoading(true);
      try {
        // Jika ada doctorId di URL, tambahkan sebagai query parameter
        const url = doctorId ? `/api/appointments?doctorId=${doctorId}` : '/api/appointments';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Gagal mengambil data janji temu');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : 'Terjadi kesalahan',
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, [doctorId, toast]);


  const handleAction = (action: string) => {
    toast({
      title: "Aksi Dicatat",
      description: `Tombol "${action}" telah diklik. Fungsionalitas penuh akan segera hadir.`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Manajemen Janji Temu</CardTitle>
            <CardDescription>Kelola semua janji temu yang dijadwalkan.</CardDescription>
        </div>
        <Button size="sm" className="gap-2" onClick={() => handleAction('Buat Janji Temu')}>
            <PlusCircle />
            Buat Janji Temu
        </Button>
      </CardHeader>
      <CardContent>
         {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Klinik</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length > 0 ? appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.clinic}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(appointment.status)}>{appointment.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Buka menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction('Edit')}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('Batalkan')}>Batalkan</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Tidak ada janji temu untuk ditampilkan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
