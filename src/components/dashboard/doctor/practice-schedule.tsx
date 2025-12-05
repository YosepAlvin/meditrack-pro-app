import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { practiceSchedules } from "@/lib/data"

const statusVariant = (status: string) => {
    switch(status) {
        case 'Sedang Berlangsung': return 'destructive';
        case 'Belum Mulai': return 'secondary';
        case 'Selesai': return 'outline';
        default: return 'default';
    }
}

export default function PracticeSchedule() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Jadwal Praktik Hari Ini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {practiceSchedules.map(schedule => (
                    <div key={schedule.id} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                        <div className="font-mono text-sm">{schedule.startTime} - {schedule.endTime}</div>
                        <div>
                            <p className="font-semibold">{schedule.clinic}</p>
                            <p className="text-sm text-muted-foreground">{schedule.room}</p>
                        </div>
                        <Badge variant={statusVariant(schedule.status)}>{schedule.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
