
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { doctors } from "@/lib/data"; // Import data

export default function BuatJanjiTemuPage() {
    const { toast } = useToast();
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

    const handleCreateAppointment = () => {
        if (!selectedDoctorId) {
            toast({
                variant: "destructive",
                title: "Gagal!",
                description: "Silakan pilih dokter terlebih dahulu.",
            });
            return;
        }

        const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);
        if (!selectedDoctor) return;

        // Simulasi pengiriman permintaan janji temu
        const newAppointment = {
            id: Math.random() * 1000,
            patientName: "Budi Sanjoyo", // Nama pasien yang login (hardcoded untuk demo)
            doctorName: selectedDoctor.name,
            doctorId: selectedDoctor.id,
            clinic: selectedDoctor.specialty,
            time: "15:00", // Waktu default
            status: "Menunggu" as const,
            complaint: "Keluhan baru",
            appointment_date: new Date().toISOString().slice(0, 10),
        };

        toast({
            title: `Permintaan Terkirim ke ${selectedDoctor.name}!`,
            description: "Janji temu Anda sedang menunggu konfirmasi.",
        });
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Buat Janji Temu Baru</CardTitle>
                    <CardDescription>Pilih tanggal dan dokter untuk membuat janji temu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Pilih Klinik</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih spesialisasi klinik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kardiologi">Kardiologi</SelectItem>
                                        <SelectItem value="neurologi">Neurologi</SelectItem>
                                        <SelectItem value="pediatri">Pediatri</SelectItem>
                                        <SelectItem value="dermatologi">Dermatologi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label>Pilih Dokter</Label>
                                <Select onValueChange={setSelectedDoctorId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih dokter yang tersedia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map(doctor => (
                                            <SelectItem key={doctor.id} value={doctor.id}>
                                                {doctor.name} - {doctor.specialty}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="notes">Keluhan (Opsional)</Label>
                                <Input id="notes" placeholder="cth., Nyeri dada sebelah kiri" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                className="rounded-md border"
                            />
                        </div>
                    </div>
                     <Button className="w-full md:w-auto" onClick={handleCreateAppointment}>Buat Janji Temu</Button>
                </CardContent>
            </Card>
        </main>
    );
}
