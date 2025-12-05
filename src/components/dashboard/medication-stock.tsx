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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { medications as initialMedications } from "@/lib/data"
import type { Medication } from "@/lib/types";
import { PlusCircle, MoreHorizontal } from "lucide-react"

export default function MedicationStock() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  const handleStockChange = (medId: string, amount: number) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === medId 
        ? { ...med, stock: Math.max(0, med.stock + amount) } 
        : med
      )
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Stok Obat</CardTitle>
            <CardDescription>Kelola dan pantau inventaris obat.</CardDescription>
        </div>
        <Button size="sm" className="gap-2">
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive hover:text-destructive">Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
