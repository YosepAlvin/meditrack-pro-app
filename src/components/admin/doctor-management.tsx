
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Doctor } from "@/lib/types";
import { PlusCircle, MoreHorizontal, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const { toast } = useToast();

  async function fetchDoctors() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/doctors');
      if (!response.ok) throw new Error("Gagal mengambil data dokter.");
      const data = await response.json();
      setDoctors(data);
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openAddDialog = () => {
    setEditingDoctor(null);
    setNewDoctor({ name: '', specialty: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor({ name: doctor.name, specialty: doctor.specialty });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingDoctor(null);
  };

  const handleSaveDoctor = async () => {
    try {
      let response;
      if (editingDoctor) {
        // Update doctor
        response = await fetch(`/api/doctors/${editingDoctor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDoctor),
        });
      } else {
        // Add new doctor
        response = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDoctor),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan data dokter.');
      }
      
      toast({
        title: "Sukses",
        description: `Data dokter berhasil ${editingDoctor ? 'diperbarui' : 'ditambahkan'}.`,
      });
      fetchDoctors(); // Refresh data
      closeDialog();

    } catch (error) {
        toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Terjadi kesalahan",
            variant: "destructive",
        });
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus dokter ini?')) return;

    try {
      const response = await fetch(`/api/doctors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus dokter.');
      }

      toast({
        title: "Sukses",
        description: "Dokter berhasil dihapus.",
      });
      fetchDoctors(); // Refresh data

    } catch (error) {
       toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Gagal menghapus dokter.",
            variant: "destructive",
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manajemen Dokter</CardTitle>
          <CardDescription>Kelola data dokter yang terdaftar di sistem.</CardDescription>
        </div>
        <Button size="sm" className="gap-2" onClick={openAddDialog}>
          <PlusCircle />
          Tambah Dokter
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
                <TableHead>Nama Dokter</TableHead>
                <TableHead>Spesialisasi (Klinik)</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {doctors.map(doctor => (
                <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(doctor)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteDoctor(doctor.id)}>
                            Hapus
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDoctor ? 'Edit Dokter' : 'Tambah Dokter Baru'}</DialogTitle>
            <DialogDescription>
              {editingDoctor ? 'Ubah detail dokter di bawah ini.' : 'Isi detail dokter baru di bawah ini.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nama</Label>
              <Input id="name" name="name" value={newDoctor.name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">Spesialisasi</Label>
              <Input id="specialty" name="specialty" value={newDoctor.specialty} onChange={handleInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Batal</Button>
            <Button onClick={handleSaveDoctor}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
