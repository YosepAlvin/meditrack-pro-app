
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";

function PatientQueueCard() {
    return (
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nomor Antrian Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">#5</div>
            <p className="text-xs">untuk Dr. Wahyu - Kardiologi</p>
            <div className="mt-4">
                <Badge variant="secondary">Status: Menunggu</Badge>
            </div>
          </CardContent>
        </Card>
    )
}


export default function PasienDashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <PatientQueueCard />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Janji Temu Berikutnya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dr. Wahyu - Besok, 10:00</div>
            <p className="text-xs text-muted-foreground">Klinik Kardiologi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Janji Temu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Termasuk 2 janji temu yang akan datang</p>
          </CardContent>
        </Card>
      </div>
      <Card>
          <CardHeader>
            <CardTitle>Riwayat Janji Temu</CardTitle>
            <CardDescription>Lihat riwayat janji temu Anda.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Dokter</TableHead>
                    <TableHead>Klinik</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>25 Okt 2023</TableCell>
                        <TableCell>Dr. Indah</TableCell>
                        <TableCell>Neurologi</TableCell>
                        <TableCell className="text-right"><Badge>Selesai</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>15 Sep 2023</TableCell>
                        <TableCell>Dr. Gunawan</TableCell>
                        <TableCell>Pediatri</TableCell>
                        <TableCell className="text-right"><Badge>Selesai</Badge></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button className="mt-4 w-full">Lihat Semua Riwayat</Button>
          </CardContent>
        </Card>
    </main>
  );
}
