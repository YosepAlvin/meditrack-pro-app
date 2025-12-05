import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck } from "lucide-react";

export default function DoctorProfile() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Profil Dokter</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
                 <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src="https://picsum.photos/seed/101/100/100" alt="Dr. Wahyu" data-ai-hint="person portrait" />
                    <AvatarFallback>DW</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="text-xl font-bold">Dr. Wahyu</h3>
                    <p className="text-muted-foreground">Spesialis Kardiologi</p>
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
