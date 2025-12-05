"use client";
import { useState } from 'react';
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
import { appointments as initialAppointments, doctors } from "@/lib/data"
import type { Appointment } from "@/lib/types"

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
    const doctorId = searchParams.get('doctor') || 'dr-wahyu';
    const doctor = doctors.find(d => d.id === doctorId);

    const [appointments, setAppointments] = useState<Appointment[]>(
        initialAppointments.filter(a => a.doctorName === doctor?.name && a.status !== 'Dibatalkan')
    );

    const handleCallPatient = (id: string) => {
        setAppointments(prev => prev.map(app => {
            if (app.id === id) {
                return { ...app, status: 'Dipanggil' };
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
                <TableCell colSpan={5} className="text-center text-muted-foreground">Tidak ada pasien dalam antrian.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
