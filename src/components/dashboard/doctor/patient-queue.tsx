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
import type { Appointment, Medication } from "@/lib/types"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { medications as allMedications } from '@/lib/data';

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
  const { toast } = useToast();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Appointment | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Filter dan set janji temu saat komponen dimuat atau doctorId berubah
  useEffect(() => {
    const filteredAppointments = allMockAppointments.filter(app => app.doctorId === doctorId);
    setAppointments(filteredAppointments);
  }, [doctorId]);

  const handleCallPatient = (id: number) => {
    setAppointments(currentAppointments =>
      currentAppointments.map(app =>
        app.id === id ? { ...app, status: 'Dipanggil' } : app
      )
    );
  };
  
  const openPrescriptionDialog = (patient: Appointment) => {
    setCurrentPatient(patient);
    setSelectedMedication('');
    setQuantity(1);
    setIsPrescriptionDialogOpen(true);
  };

  const handlePrescribe = () => {
    if (!currentPatient || !selectedMedication || quantity <= 0) {
        toast({ title: "Error", description: "Pilih obat dan jumlah yang valid.", variant: "destructive" });
        return;
    }

    const medIndex = allMedications.findIndex(med => med.id === selectedMedication);
    if (medIndex === -1) {
        toast({ title: "Error", description: "Obat tidak ditemukan.", variant: "destructive" });
        return;
    }

    const medToPrescribe = allMedications[medIndex];
    
    // Validasi stok
    if (medToPrescribe.stock < quantity) {
        toast({
            title: "Stok Tidak Cukup!",
            description: `Stok ${medToPrescribe.name} hanya tersisa ${medToPrescribe.stock}.`,
            variant: "destructive",
        });
        return;
    }

    // Kurangi stok (simulasi)
    allMedications[medIndex].stock -= quantity;
    
    // Ubah status pasien menjadi "Selesai"
    setAppointments(currentAppointments =>
      currentAppointments.map(app =>
        app.id === currentPatient.id ? { ...app, status: 'Selesai' } : app
      )
    );

    toast({
        title: "Resep Diberikan!",
        description: `${quantity} ${medToPrescribe.name} telah diresepkan untuk ${currentPatient.patientName}. Stok diperbarui.`,
    });

    setIsPrescriptionDialogOpen(false);
  };

  return (
    <>
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
                <TableCell className="text-right space-x-2">
                 {appointment.status === 'Dipanggil' && (
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openPrescriptionDialog(appointment)}
                    >
                        Tulis Resep
                    </Button>
                )}
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

    <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tulis Resep untuk {currentPatient?.patientName}</DialogTitle>
            <DialogDescription>
              Pilih obat dari daftar dan tentukan jumlahnya. Stok akan otomatis dikurangi.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medication" className="text-right">Obat</Label>
               <Select onValueChange={setSelectedMedication}>
                  <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih obat..." />
                  </SelectTrigger>
                  <SelectContent>
                      {allMedications.map(med => (
                          <SelectItem key={med.id} value={med.id}>
                              {med.name} ({med.strength}) - Stok: {med.stock}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">Jumlah</Label>
              <Input id="quantity" name="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="col-span-3" min="1"/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)}>Batal</Button>
            <Button onClick={handlePrescribe}>Resepkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

    