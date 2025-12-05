
"use client";

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
import { appointments as allAppointments, doctors } from "@/lib/data"
import type { Appointment } from "@/lib/types"
import { MoreHorizontal, PlusCircle } from "lucide-react";
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
  
  // Find the doctor's name based on the ID from the URL
  const activeDoctor = doctors.find(d => d.id === doctorId);

  // Filter appointments based on the active doctor's name.
  // If no doctor is found in URL, show all appointments (for admin view)
  const filteredAppointments = doctorId 
    ? allAppointments.filter(a => a.doctorName === activeDoctor?.name && a.status !== 'Dibatalkan')
    : allAppointments.filter(a => a.status !== 'Dibatalkan');

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
            {filteredAppointments.length > 0 ? filteredAppointments.map((appointment) => (
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
      </CardContent>
    </Card>
  )
}
