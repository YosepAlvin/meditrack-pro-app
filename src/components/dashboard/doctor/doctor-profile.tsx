
"use client";

import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck } from "lucide-react";
import { doctors } from "@/lib/data";

export default function DoctorProfile() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctor') || 'dr-wahyu';
    const doctor = doctors.find(d => d.id === doctorId);

    if (!doctor) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Profil Dokter</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Dokter tidak ditemukan.</p>
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
