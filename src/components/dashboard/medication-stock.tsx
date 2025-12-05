"use client";

import { useState } from "react";
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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { medications as initialMedications } from "@/lib/data"
import type { Medication } from "@/lib/types";
import { PlusCircle, MoreHorizontal } from "lucide-react"

export default function MedicationStock() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', strength: '', stock: 0, lowStockThreshold: 10 });
  const [editingMed, setEditingMed] = useState<Medication | null>(null);


  const handleStockChange = (medId: string, amount: number) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === medId 
        ? { ...med, stock: Math.max(0, med.stock + amount) } 
        : med
      )
    );
  };

  const handleSaveMedication = () => {
    if (editingMed) {
      // Logic for updating an existing medication
      setMedications(meds => meds.map(m => m.id === editingMed.id ? { ...editingMed, ...newMed, stock: Number(newMed.stock) || 0, lowStockThreshold: Number(newMed.lowStockThreshold) || 0 } : m));
    } else {
      // Logic for adding a new medication
      const newMedication: Medication = {
        id: `med-${Date.now()}`,
        ...newMed,
        stock: Number(newMed.stock) || 0,
        lowStockThreshold: Number(newMed.lowStockThreshold) || 0
      };
      setMedications(meds => [...meds, newMedication]);
    }
    closeDialog();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMed(prev => ({ ...prev, [name]: value }));
  };

  const openEditDialog = (med: Medication) => {
    setEditingMed(med);
    setNewMed({ name: med.name, strength: med.strength, stock: med.stock, lowStockThreshold: med.lowStockThreshold });
    setIsDialogOpen(true);
  };
  
  const openAddDialog = () => {
    setEditingMed(null);
    setNewMed({ name: '', strength: '', stock: 0, lowStockThreshold: 10 });
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingMed(null);
  };
  
  const handleDeleteMedication = (id: string) => {
    setMedications(meds => meds.filter(m => m.id !== id));
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Stok Obat</CardTitle>
            <CardDescription>Kelola dan pantau inventaris obat.</CardDescription>
        </div>
         <Button size="sm" className="gap-2" onClick={openAddDialog}>
            <PlusCircle />
            Tambah Obat
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Obat</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.id}>
                <TableCell className="font-medium">
                  <div>{med.name}</div>
                  <div className="text-xs text-muted-foreground">{med.strength}</div>
                </TableCell>
                <TableCell>
                   <Badge variant={med.stock <= med.lowStockThreshold ? "destructive" : "outline"}>
                    {med.stock}
                  </Badge>
                  {med.stock <= med.lowStockThreshold && 
                    <p className="text-xs text-destructive mt-1">Stok Rendah</p>
                  }
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStockChange(med.id, 10)}>Tambah 10</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStockChange(med.id, -10)}>Kurangi 10</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(med)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive hover:text-destructive" onClick={() => handleDeleteMedication(med.id)}>Hapus</DropdownMenuItem>
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
                    <DialogTitle>{editingMed ? 'Edit Obat' : 'Tambah Obat Baru'}</DialogTitle>
                    <DialogDescription>
                        {editingMed ? 'Ubah detail obat di bawah ini.' : 'Isi detail obat baru di bawah ini.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nama</Label>
                        <Input id="name" name="name" value={newMed.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="strength" className="text-right">Kekuatan</Label>
                        <Input id="strength" name="strength" value={newMed.strength} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">Stok</Label>
                        <Input id="stock" name="stock" type="number" value={newMed.stock} onChange={handleInputChange} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lowStockThreshold" className="text-right">Batas Stok</Label>
                        <Input id="lowStockThreshold" name="lowStockThreshold" type="number" value={newMed.lowStockThreshold} onChange={handleInputChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={closeDialog}>Batal</Button>
                    <Button onClick={handleSaveMedication}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Card>
  )
}
