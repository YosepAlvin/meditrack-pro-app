import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { medicalRecords } from "@/lib/data"

export default function RecentMedicalRecords() {
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
            {medicalRecords.slice(0, 5).map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                    <div className="font-medium">{record.patientName}</div>
                    <div className="text-xs text-muted-foreground">{record.date}</div>
                </TableCell>
                <TableCell>{record.diagnosis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
