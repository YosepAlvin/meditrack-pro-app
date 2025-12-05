
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Appointment | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  
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

  const openPrescriptionDialog = (patient: Appointment) => {
    setCurrentPatient(patient);
    setSelectedMedication('');
    setQuantity(1);
    setIsPrescriptionDialogOpen(true);
  };

  const handlePrescribe = () => {
    // 1. Tutup dialog SEGERA untuk menghindari UI freeze.
    setIsPrescriptionDialogOpen(false);
    
    // 2. Lakukan validasi
    if (!currentPatient || !selectedMedication || quantity <= 0) {
        toast({ title: "Error", description: "Pilih obat dan jumlah yang valid.", variant: "destructive" });
        return;
    }

    const medToPrescribe = allMedications.find(med => med.id === selectedMedication);
    if (!medToPrescribe) {
        toast({ title: "Error", description: "Obat tidak ditemukan.", variant: "destructive" });
        return;
    }
    
    if (medToPrescribe.stock < quantity) {
        toast({ title: "Stok Tidak Cukup!", description: `Stok ${medToPrescribe.name} hanya tersisa ${medToPrescribe.stock}.`, variant: "destructive" });
        return;
    }
    
    // 3. Modifikasi data MOCK (di dunia nyata ini adalah panggilan API)
    // Ini tidak akan menyebabkan re-render, hanya untuk simulasi
    const medIndex = allMedications.findIndex(med => med.id === selectedMedication);
    if (medIndex !== -1) {
        allMedications[medIndex].stock -= quantity;
    }

    // 4. Perbarui state untuk memicu re-render yang aman
    setAppointments(currentApps =>
      currentApps.map(app =>
        app.id === currentPatient.id ? { ...app, status: 'Selesai' } : app
      )
    );

    // 5. Tampilkan notifikasi SETELAH semua pembaruan state selesai
    toast({ 
        title: "Resep Diberikan & Selesai!", 
        description: `${quantity} ${medToPrescribe.name} telah diresepkan untuk ${currentPatient.patientName}.` 
    });
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
                                Tulis Resep
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

    {/* DIALOG UNTUK RESEP */}
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
               <Select onValueChange={setSelectedMedication} value={selectedMedication}>
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
