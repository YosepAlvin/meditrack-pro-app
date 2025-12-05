import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { patients } from "@/lib/data"
import { Search } from "lucide-react"

export default function PatientLookup() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Rekam Medis Pasien</CardTitle>
        <CardDescription>Cari dan lihat riwayat pasien.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari pasien..." className="pl-10" />
        </div>
        <ScrollArea className="h-64">
          <div className="space-y-4 pr-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
