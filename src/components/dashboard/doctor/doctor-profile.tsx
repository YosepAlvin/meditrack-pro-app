
"use client";

import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck } from "lucide-react";
import type { Doctor } from "@/lib/types";

// Fungsi helper untuk membuat profil dokter dinamis dari URL.
// Ini berguna jika dokter belum ada di data awal.
const getDoctor = (searchParams: URLSearchParams): Doctor | null => {
    const doctorId = searchParams.get('doctor');
    const name = searchParams.get('name');
    const specialty = searchParams.get('specialty');

    if (name) {
        return {
            id: doctorId || `dr-${name.toLowerCase().replace(/ /g, '-')}`,
            name: name,
            specialty: specialty || 'Spesialis Umum',
            avatarUrl: `https://picsum.photos/seed/${Buffer.from(name).toString('hex')}/100/100`
        };
    }
    return null;
}

export default function DoctorProfile() {
    const searchParams = useSearchParams();
    const doctor = getDoctor(searchParams);

    if (!doctor) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Profil Dokter</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Pilih dokter untuk melihat profil.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Profil Dokter</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
                 <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={doctor.avatarUrl} alt={doctor.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                </div>
                <Badge variant="default" className="gap-2">
                    <UserCheck className="h-4 w-4"/>
                    Online
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Praktik: 08:00 - 17:00</span>
                </div>
            </CardContent>
        </Card>
    )
}
