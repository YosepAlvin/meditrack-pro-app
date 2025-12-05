
"use client";

import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Medication } from "@/lib/types";
import { PlusCircle, MoreHorizontal, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast";

export default function MedicationStock() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [newMed, setNewMed] = useState({ name: '', strength: '', stock: 0, lowStockThreshold: 10 });
  const { toast } = useToast();

  async function fetchMedications() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/medications');
      if (!response.ok) throw new Error("Gagal mengambil data obat.");
      const data = await response.json();
      setMedications(data);
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
    fetchMedications();
  }, []);

  const openAddDialog = () => {
    setEditingMed(null);
    setNewMed({ name: '', strength: '', stock: 0, lowStockThreshold: 10 });
    setIsDialogOpen(true);
  };

  const openEditDialog = (med: Medication) => {
    setEditingMed(med);
    setNewMed({ name: med.name, strength: med.strength || '', stock: med.stock, lowStockThreshold: med.lowStockThreshold });
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingMed(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMed(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveMedication = async () => {
    try {
      const url = editingMed ? `/api/medications/${editingMed.id}` : '/api/medications';
      const method = editingMed ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newMed,
          stock: Number(newMed.stock),
          lowStockThreshold: Number(newMed.lowStockThreshold)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan data obat.');
      }
      
      toast({
        title: "Sukses",
        description: `Data obat berhasil ${editingMed ? 'diperbarui' : 'ditambahkan'}.`,
      });
      fetchMedications(); // Refresh data
      closeDialog();

    } catch (error) {
        toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Terjadi kesalahan",
            variant: "destructive",
        });
    }
  };

  const handleDeleteMedication = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus obat ini?')) return;

    try {
      const response = await fetch(`/api/medications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus obat.');
      }

      toast({
        title: "Sukses",
        description: "Obat berhasil dihapus.",
      });
      fetchMedications(); // Refresh data

    } catch (error) {
       toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Gagal menghapus obat.",
            variant: "destructive",
        });
    }
  };

  const handleStockChange = async (med: Medication, amount: number) => {
    const newStock = Math.max(0, med.stock + amount);
    try {
      const response = await fetch(`/api/medications/${med.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...med, stock: newStock }),
      });
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengubah stok.');
      }
      toast({
        title: "Stok Diperbarui",
        description: `Stok ${med.name} diubah menjadi ${newStock}.`,
      });
      fetchMedications();
    } catch (error) {
       toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Gagal mengubah stok.",
            variant: "destructive",
        });
    }
  };


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
        {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin" />
            </div>
        ) : (
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
                        <DropdownMenuItem onClick={() => handleStockChange(med, 10)}>Tambah 10</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStockChange(med, -10)}>Kurangi 10</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(med)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteMedication(med.id)}>Hapus</DropdownMenuItem>
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
