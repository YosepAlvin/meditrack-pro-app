
"use client";

import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { medicalRecords as allRecords, doctors } from "@/lib/data"

export default function RecentMedicalRecords() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctor') || 'dr-wahyu';
    const doctor = doctors.find(d => d.id === doctorId);

    const medicalRecords = allRecords.filter(rec => rec.doctorName === doctor?.name).slice(0, 5);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rekam Medis Terbaru</CardTitle>
        <CardDescription>5 konsultasi terakhir yang Anda tangani.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pasien</TableHead>
              <TableHead>Diagnosis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.length > 0 ? medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                    <div className="font-medium">{record.patientName}</div>
                    <div className="text-xs text-muted-foreground">{record.date}</div>
                </TableCell>
                <TableCell>{record.diagnosis}</TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                        Belum ada rekam medis.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
