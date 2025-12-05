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
import { Button } from "@/components/ui/button";

const users = [
    { id: '1', name: 'Dr. Wahyu', email: 'dr.wahyu@example.com', role: 'Dokter' },
    { id: '2', name: 'Dr. Indah', email: 'dr.indah@example.com', role: 'Dokter' },
    { id: '3', name: 'Budi Sanjoyo', email: 'budi.s@example.com', role: 'Pasien' },
    { id: '4', name: 'Siti Aminah', email: 'siti.a@example.com', role: 'Pasien' },
    { id: '5', name: 'Admin Utama', email: 'admin@example.com', role: 'Admin' },
];

export default function ManajemenPenggunaPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
        <CardHeader>
            <CardTitle>Manajemen Pengguna</CardTitle>
            <CardDescription>Kelola pengguna dan peran mereka di dalam sistem.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Dokter' ? 'default' : 'secondary'}>
                            {user.role}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </main>
  );
}
