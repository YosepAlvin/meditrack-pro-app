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
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/types"
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const statusVariant = (status: Appointment['status']) => {
  switch (status) {
    case 'Menunggu':
      return 'secondary';
    case 'Dipanggil':
      return 'default';
    case 'Selesai':
      return 'outline';
    default:
      return 'secondary';
  }
}

export default function PatientQueue() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctor'); // doctorId dari URL
    const { toast } = useToast();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAppointments() {
            if (!doctorId) {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            try {
                // Mengirim doctorId ke API
                const response = await fetch(`/api/appointments?doctorId=${encodeURIComponent(doctorId)}`);
                if (!response.ok) throw new Error("Gagal mengambil data antrian.");
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Terjadi kesalahan",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchAppointments();
    }, [doctorId, toast]);

    const handleCallPatient = (id: number) => {
        setAppointments(prev => prev.map(app => {
            if (app.id === id) {
                return { ...app, status: 'Dipanggil' };
            }
            if (app.status === 'Dipanggil') {
                return { ...app, status: 'Menunggu'};
            }
            return app;
        }));
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antrian Pasien Hari Ini</CardTitle>
        <CardDescription>Daftar pasien yang dijadwalkan untuk konsultasi hari ini.</CardDescription>
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
                <TableHead>Antrian</TableHead>
                <TableHead>Nama Pasien</TableHead>
                <TableHead>Keluhan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.length > 0 ? appointments.map((appointment, index) => (
                <TableRow key={appointment.id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell className="text-muted-foreground">{appointment.complaint}</TableCell>
                    <TableCell>
                    <Badge variant={statusVariant(appointment.status)}>{appointment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button 
                        size="sm" 
                        disabled={appointment.status !== 'Menunggu'}
                        onClick={() => handleCallPatient(appointment.id)}
                    >
                        Mulai Periksa
                    </Button>
                    </TableCell>
                </TableRow>
                )) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">Tidak ada pasien dalam antrian untuk dokter ini.</TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  )
}
