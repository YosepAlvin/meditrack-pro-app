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
import { medications as initialMedications } from "@/lib/data"
import type { Medication } from "@/lib/types";
import { PlusCircle, MinusCircle } from "lucide-react"

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
      <CardHeader>
        <CardTitle>Stok Obat</CardTitle>
        <CardDescription>Kelola dan pantau inventaris obat.</CardDescription>
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
                  {med.stock <= med.lowStockThreshold ? (
                    <Badge variant="destructive">Stok Rendah</Badge>
                  ) : null}
                  <span className="ml-2">{med.stock}</span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStockChange(med.id, -1)}>
                    <MinusCircle className="h-4 w-4" />
                    <span className="sr-only">Kurangi stok</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStockChange(med.id, 1)}>
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Tambah stok</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}