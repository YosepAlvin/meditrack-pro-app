
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Patient } from "@/lib/types";
import { Search, MoreHorizontal, PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

const initialPatients: Patient[] = [
  { id: '1', name: 'Budi Sanjoyo', avatarUrl: 'https://picsum.photos/seed/1/40/40', email: 'budi.sanjoyo@example.com', lastVisit: '2023-10-26' },
  { id: '2', name: 'Siti Aminah', avatarUrl: 'https://picsum.photos/seed/2/40/40', email: 'siti.aminah@example.com', lastVisit: '2023-10-25' },
];


export default function PatientLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', avatarUrl: '' });


  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingPatient(null);
    setNewPatient({ name: '', email: '', avatarUrl: `https://picsum.photos/seed/${Date.now()}/40/40` });
    setIsDialogOpen(true);
  }

  const openEditDialog = (patient: Patient) => {
    setEditingPatient(patient);
    setNewPatient({ name: patient.name, email: patient.email, avatarUrl: patient.avatarUrl });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPatient(null);
  };

  const handleSavePatient = () => {
    if (editingPatient) {
      setPatients(pats => pats.map(p => p.id === editingPatient.id ? { ...editingPatient, ...newPatient } : p));
    } else {
      const patientToAdd: Patient = {
        id: `pat-${Date.now()}`,
        lastVisit: new Date().toISOString().split('T')[0],
        ...newPatient
      };
      setPatients(pats => [patientToAdd, ...pats]);
    }
    closeDialog();
  };

  const handleDeletePatient = (id: string) => {
    setPatients(pats => pats.filter(p => p.id !== id));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({ ...prev, [name]: value }));
  };


  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Manajemen Pasien</CardTitle>
            <CardDescription>Cari, tambah, dan kelola data pasien.</CardDescription>
        </div>
         <Button size="sm" className="gap-2" onClick={openAddDialog}>
            <PlusCircle />
            Tambah Pasien
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari pasien..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[350px]">
          <div className="space-y-4 pr-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-1">
                  <p className="text-sm font-medium leading-none">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(patient)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive hover:text-destructive" onClick={() => handleDeletePatient(patient.id)}>Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingPatient ? 'Edit Pasien' : 'Tambah Pasien Baru'}</DialogTitle>
                    <DialogDescription>
                        {editingPatient ? 'Ubah detail pasien di bawah ini.' : 'Isi detail pasien baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nama</Label>
                        <Input id="name" name="name" value={newPatient.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" value={newPatient.email} onChange={handleInputChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={closeDialog}>Batal</Button>
                    <Button onClick={handleSavePatient}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Card>
  )
}
