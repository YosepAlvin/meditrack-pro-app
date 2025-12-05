
"use client";

import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PracticeSchedule } from "@/lib/types";

const allSchedules: PracticeSchedule[] = [
    { id: 'sch-1', doctorId: 'dr-wahyu', startTime: '08:00', endTime: '12:00', clinic: 'Poli Jantung', room: 'Ruang 5', status: 'Sedang Berlangsung' },
    { id: 'sch-3', doctorId: 'dr-indah', startTime: '09:00', endTime: '13:00', clinic: 'Poli Saraf', room: 'Ruang 2', status: 'Sedang Berlangsung' },
    { id: 'sch-5', doctorId: 'dr-gunawan', startTime: '08:00', endTime: '12:00', clinic: 'Poli Anak', room: 'Ruang 1', status: 'Sedang Berlangsung' },
];


const statusVariant = (status: string) => {
    switch(status) {
        case 'Sedang Berlangsung': return 'destructive';
        case 'Belum Mulai': return 'secondary';
        case 'Selesai': return 'outline';
        default: return 'default';
    }
}

export default function PracticeSchedule() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctor') || 'dr-wahyu';
    const practiceSchedules = allSchedules.filter(s => s.doctorId === doctorId);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Jadwal Praktik Hari Ini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {practiceSchedules.length > 0 ? practiceSchedules.map(schedule => (
                    <div key={schedule.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                        <div className="font-mono text-sm">{schedule.startTime} - {schedule.endTime}</div>
                        <div>
                            <p className="font-semibold">{schedule.clinic}</p>
                            <p className="text-sm text-muted-foreground">{schedule.room}</p>
                        </div>
                        <Badge variant={statusVariant(schedule.status)}>{schedule.status}</Badge>
                    </div>
                )) : <p className="text-sm text-muted-foreground">Tidak ada jadwal praktik hari ini.</p>}
            </CardContent>
        </Card>
    )
}
