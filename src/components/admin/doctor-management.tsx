"use client";

import { useState } from "react";
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
import { doctors as initialDoctors } from "@/lib/data";
import type { Doctor } from "@/lib/types";
import { PlusCircle, MoreHorizontal } from "lucide-react";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState({ id: '', name: '', specialty: '', avatarUrl: '' });

  const openAddDialog = () => {
    setEditingDoctor(null);
    const newId = `dr-${newDoctor.name.toLowerCase().replace(/\s/g, '-') || Date.now()}`;
    setNewDoctor({ 
        id: newId, 
        name: '', 
        specialty: '', 
        avatarUrl: `https://picsum.photos/seed/${newId}/100/100` 
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor(doctor);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingDoctor(null);
  };

  const handleSaveDoctor = () => {
    if (editingDoctor) {
      setDoctors(docs => docs.map(d => (d.id === editingDoctor.id ? newDoctor : d)));
    } else {
      const id = `dr-${newDoctor.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const doctorToAdd: Doctor = {
        ...newDoctor,
        id,
        avatarUrl: `https://picsum.photos/seed/${id}/100/100`
      };
      setDoctors(docs => [doctorToAdd, ...docs]);
    }
    closeDialog();
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(docs => docs.filter(d => d.id !== id));
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
                      <DropdownMenuItem className="text-destructive hover:text-destructive" onClick={() => handleDeleteDoctor(doctor.id)}>
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
