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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Appointment, Medication } from "@/lib/types"
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
  const [medications, setMedications] = useState<Medication[]>(() => JSON.parse(JSON.stringify(allMedications)));
  const [isLoading, setIsLoading] = useState(true);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Appointment | null>(null);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [prescriptionQuantity, setPrescriptionQuantity] = useState(1);
  
  useEffect(() => {
    setIsLoading(true);
    // Deep copy data to prevent state mutation issues
    const allData = JSON.parse(JSON.stringify(allMockAppointments));
    const filteredAppointments = doctorId 
      ? allData.filter((app: Appointment) => app.doctorId === doctorId)
      : allData;
    setAppointments(filteredAppointments);
    setIsLoading(false);
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

  const openPrescriptionDialog = (appointment: Appointment) => {
    setCurrentPatient(appointment);
    setSelectedMedicationId(null);
    setPrescriptionQuantity(1);
    setIsPrescriptionDialogOpen(true);
  }

  const handlePrescribe = () => {
    // 1. Validate
    if (!currentPatient || !selectedMedicationId) return;
    const medication = medications.find(m => m.id === selectedMedicationId);
    if (!medication) {
        toast({ title: "Error", description: "Obat tidak ditemukan.", variant: "destructive" });
        return;
    }
    if (medication.stock < prescriptionQuantity) {
        toast({ title: "Stok Habis!", description: `Stok ${medication.name} tidak mencukupi.`, variant: "destructive" });
        return;
    }

    // 2. Close the dialog first to prevent UI freeze
    setIsPrescriptionDialogOpen(false);

    // 3. Update medication state using functional update
    setMedications(prevMeds =>
        prevMeds.map(m =>
            m.id === selectedMedicationId
                ? { ...m, stock: m.stock - prescriptionQuantity }
                : m
        )
    );

    // 4. Update appointment state using functional update
    setAppointments(prevApps =>
        prevApps.map(app =>
            app.id === currentPatient.id
                ? { ...app, status: 'Selesai' }
                : app
        )
    );
    
    // 5. Show notification after state updates are queued
    toast({
        title: "Resep Diberikan!",
        description: `${prescriptionQuantity} unit ${medication.name} diresepkan untuk ${currentPatient.patientName}.`,
    });

    // 6. Reset dialog state
    setCurrentPatient(null);
    setSelectedMedicationId(null);
    setPrescriptionQuantity(1);
  };


  return (
    <>
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
                                onClick={() => openPrescriptionDialog(appointment)}
                                disabled={appointment.status !== 'Dipanggil'}
                            >
                                Resepkan &amp; Selesaikan
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

    <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Tulis Resep untuk {currentPatient?.patientName}</DialogTitle>
                <DialogDescription>Pilih obat dan tentukan jumlahnya. Stok akan berkurang secara otomatis.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Obat</Label>
                    <Select onValueChange={setSelectedMedicationId} defaultValue={selectedMedicationId || undefined}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih obat..." />
                        </SelectTrigger>
                        <SelectContent>
                            {medications.map(med => (
                                <SelectItem key={med.id} value={med.id} disabled={med.stock === 0}>
                                    {med.name} ({med.strength}) - Stok: {med.stock}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="quantity">Jumlah</Label>
                    <Input 
                        id="quantity" 
                        type="number" 
                        min="1" 
                        value={prescriptionQuantity} 
                        onChange={(e) => setPrescriptionQuantity(Number(e.target.value))} 
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button onClick={handlePrescribe} disabled={!selectedMedicationId || prescriptionQuantity <= 0}>
                    Resepkan &amp; Selesaikan
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
