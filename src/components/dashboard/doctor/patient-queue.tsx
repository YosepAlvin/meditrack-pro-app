
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
import { medications as allMedications, appointments as allMockAppointments } from '@/lib/data';

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
  
  useEffect(() => {
    const filteredAppointments = allMockAppointments.filter(app => app.doctorId === doctorId && (app.status === 'Menunggu' || app.status === 'Dipanggil'));
    setAppointments(filteredAppointments);
  }, [doctorId]);

  const handleCallPatient = (id: number) => {
    const updatedAppointments = appointments.map(app =>
        app.id === id ? { ...app, status: 'Dipanggil' } : app
      )
    setAppointments(updatedAppointments);
    
    const globalIndex = allMockAppointments.findIndex(app => app.id === id);
    if(globalIndex !== -1) {
        allMockAppointments[globalIndex].status = 'Dipanggil';
    }
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
    
    if (medToPrescribe.stock < quantity) {
        toast({
            title: "Stok Tidak Cukup!",
            description: `Stok ${medToPrescribe.name} hanya tersisa ${medToPrescribe.stock}.`,
            variant: "destructive",
        });
        return;
    }

    allMedications[medIndex].stock -= quantity;
    
    setAppointments(currentAppointments =>
      currentAppointments.filter(app => app.id !== currentPatient.id)
    );

    const globalIndex = allMockAppointments.findIndex(app => app.id === currentPatient.id);
    if(globalIndex !== -1) {
        allMockAppointments[globalIndex].status = 'Selesai';
    }

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
        <CardDescription>Daftar pasien yang menunggu untuk konsultasi.</CardDescription>
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
                    Panggil
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
                          <SelectItem key={med.id} value={med.id} disabled={med.stock === 0}>
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
            <Button onClick={handlePrescribe}>Resepkan & Selesaikan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

    
