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
import { appointments } from "@/lib/data"
import type { Appointment } from "@/lib/types"

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
  const todaysAppointments = appointments.filter(a => a.status !== 'Dibatalkan');

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Janji Temu Terbaru</CardTitle>
        <CardDescription>Daftar janji temu yang dijadwalkan untuk hari ini.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pasien</TableHead>
              <TableHead>Dokter</TableHead>
              <TableHead>Klinik</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todaysAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.clinic}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={statusVariant(appointment.status)}>{appointment.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
