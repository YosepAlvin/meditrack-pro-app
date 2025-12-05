
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
import { medications as allMedications, appointments as allMockAppointments } from '@/lib/data';
import Link from 'next/link';

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
    setIsLoading(true);
    // Simulasikan pengambilan data dari API
    setTimeout(() => {
      const filteredAppointments = doctorId 
        ? allMockAppointments.filter(app => app.doctorId === doctorId)
        : allMockAppointments;
      setAppointments(filteredAppointments);
      setIsLoading(false);
    }, 500);
  }, [doctorId]);

  const handleUpdateStatus = (appointmentId: number, newStatus: Appointment['status']) => {
    setAppointments(currentAppointments =>
      currentAppointments.map(app =>
        app.id === appointmentId ? { ...app, status: newStatus } : app
      )
    );
    toast({
      title: "Status Diperbarui",
      description: `Status janji temu telah diubah menjadi ${newStatus}.`,
    });
  };

  // FUNGSI DISEDERHANAKAN UNTUK DEBUGGING
  const handlePrescribeAndFinish = (appointmentId: number) => {
    setAppointments(currentAppointments =>
      currentAppointments.map(app =>
        app.id === appointmentId ? { ...app, status: 'Selesai' } : app
      )
    );
    toast({
      title: "Pemeriksaan Selesai",
      description: `Janji temu telah diselesaikan.`,
    });
  };


  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Antrian & Janji Temu</CardTitle>
            <CardDescription>Kelola antrian pasien dan semua janji temu.</CardDescription>
        </div>
        <Button size="sm" className="gap-2" asChild>
            <Link href={doctorId ? `/dashboard/janji-temu/baru?doctor=${doctorId}`: `/admin-dashboard/janji-temu/baru`}>
                <PlusCircle />
                Buat Janji Temu
            </Link>
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
                {!doctorId && <TableHead>Dokter</TableHead>}
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
                   {!doctorId && <TableCell>{appointment.doctorName}</TableCell>}
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
                            <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(appointment.id, 'Dipanggil')}
                                disabled={appointment.status !== 'Terkonfirmasi'}
                            >
                                Panggil Pasien
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handlePrescribeAndFinish(appointment.id)}
                                disabled={appointment.status !== 'Dipanggil'}
                            >
                                Selesaikan Pemeriksaan
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(appointment.id, 'Terkonfirmasi')}
                                disabled={appointment.status !== 'Menunggu'}
                            >
                                Konfirmasi
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleUpdateStatus(appointment.id, 'Dibatalkan')}
                                disabled={appointment.status === 'Dibatalkan' || appointment.status === 'Selesai'}
                            >
                                Batalkan
                            </DropdownMenuItem>
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
