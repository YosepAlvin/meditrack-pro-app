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

// Data statis (mock) untuk janji temu
const allMockAppointments: Appointment[] = [
  // Pasien Dr. Wahyu (Kardiologi)
  { id: 101, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Bima', time: '09:00', status: 'Menunggu', complaint: 'Jantung berdebar', appointment_date: '' },
  { id: 102, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Anta', time: '09:30', status: 'Menunggu', complaint: 'Nyeri dada kiri', appointment_date: '' },
  { id: 103, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Candra', time: '10:00', status: 'Menunggu', complaint: 'Sesak napas', appointment_date: '' },
  { id: 104, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Dharma', time: '10:30', status: 'Menunggu', complaint: 'Tekanan darah tinggi', appointment_date: '' },
  { id: 105, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Eka', time: '11:00', status: 'Menunggu', complaint: 'Pusing', appointment_date: '' },
  { id: 106, doctorId: 'dr-wahyu', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', patientName: 'Fajar', time: '11:30', status: 'Menunggu', complaint: 'Kontrol rutin', appointment_date: '' },

  // Pasien Dr. Indah (Neurologi)
  { id: 201, doctorId: 'dr-indah', doctorName: 'Dr. Indah', clinic: 'Neurologi', patientName: 'Rudi', time: '09:15', status: 'Menunggu', complaint: 'Sakit kepala', appointment_date: '' },
  { id: 202, doctorId: 'dr-indah', doctorName: 'Dr. Indah', clinic: 'Neurologi', patientName: 'Abi', time: '09:45', status: 'Menunggu', complaint: 'Kesemutan', appointment_date: '' },
  { id: 203, doctorId: 'dr-indah', doctorName: 'Dr. Indah', clinic: 'Neurologi', patientName: 'Gita', time: '10:15', status: 'Menunggu', complaint: 'Sulit tidur', appointment_date: '' },
  { id: 204, doctorId: 'dr-indah', doctorName: 'Dr. Indah', clinic: 'Neurologi', patientName: 'Hana', time: '10:45', status: 'Menunggu', complaint: 'Migrain', appointment_date: '' },
  { id: 205, doctorId: 'dr-indah', doctorName: 'Dr. Indah', clinic: 'Neurologi', patientName: 'Intan', time: '11:15', status: 'Menunggu', complaint: 'Vertigo', appointment_date: '' },

  // Pasien Dr. Gunawan (Pediatri)
  { id: 301, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Fais', time: '08:00', status: 'Menunggu', complaint: 'Demam', appointment_date: '' },
  { id: 302, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Hari', time: '08:30', status: 'Menunggu', complaint: 'Batuk pilek', appointment_date: '' },
  { id: 303, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Joko', time: '09:00', status: 'Menunggu', complaint: 'Vaksinasi', appointment_date: '' },
  { id: 304, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Lina', time: '09:30', status: 'Menunggu', complaint: 'Diare', appointment_date: '' },
  { id: 305, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Maya', time: '10:00', status: 'Menunggu', complaint: 'Ruam kulit', appointment_date: '' },
  { id: 306, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Nino', time: '10:30', status: 'Menunggu', complaint: 'Cek tumbuh kembang', appointment_date: '' },
  { id: 307, doctorId: 'dr-gunawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', patientName: 'Olivia', time: '11:00', status: 'Menunggu', complaint: 'Nafsu makan kurang', appointment_date: '' },
];


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
  const doctorId = searchParams.get('doctor');
  
  // Gunakan state untuk mengelola daftar janji temu
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Filter dan set janji temu saat komponen dimuat atau doctorId berubah
  useEffect(() => {
    const filteredAppointments = allMockAppointments.filter(app => app.doctorId === doctorId);
    setAppointments(filteredAppointments);
  }, [doctorId]);

  // Fungsi untuk menangani klik tombol "Mulai Periksa"
  const handleCallPatient = (id: number) => {
    setAppointments(currentAppointments =>
      currentAppointments.map(app =>
        app.id === id ? { ...app, status: 'Dipanggil' } : app
      )
    );
  };

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
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Tidak ada pasien dalam antrian untuk dokter ini.
                </TableCell>
            </TableRow>
            )}
        </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
