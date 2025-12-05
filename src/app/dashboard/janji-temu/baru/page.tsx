
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import type { Doctor } from "@/lib/types";

export default function BuatJanjiTemuDokterPage() {
    const { toast } = useToast();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const res = await fetch('/api/doctors');
                if (!res.ok) throw new Error('Gagal mengambil data dokter');
                const data = await res.json();
                setDoctors(data);
            } catch (error) {
                 toast({
                    title: "Error",
                    description: "Gagal memuat data dokter.",
                    variant: "destructive",
                });
            }
        }
        fetchDoctors();
    }, [toast]);


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

        toast({
            title: "Janji Temu Dibuat!",
            description: `Janji temu baru untuk ${selectedDoctor.name} telah disimulasikan. Kembali ke halaman Janji Temu untuk melihatnya.`,
        });
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Buat Janji Temu Baru (Dokter/Admin)</CardTitle>
                    <CardDescription>Isi detail di bawah untuk membuat janji temu baru untuk pasien.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="patient-name">Nama Pasien</Label>
                                <Input id="patient-name" placeholder="Cari atau masukkan nama pasien" />
                            </div>
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
                                        <SelectItem value="umum">Umum</SelectItem>
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
                                <Label htmlFor="complaint">Keluhan</Label>
                                <Textarea id="complaint" placeholder="cth., Nyeri dada sebelah kiri" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Calendar
                                mode="single"
                                selected={new Date()}
                                className="rounded-md border"
                            />
                            <div className="w-full space-y-2">
                                <Label htmlFor="time">Waktu Janji Temu</Label>
                                <Input id="time" type="time" defaultValue="09:00" />
                            </div>
                        </div>
                    </div>
                     <Button className="w-full md:w-auto" onClick={handleCreateAppointment}>Buat Janji Temu</Button>
                </CardContent>
            </Card>
        </main>
    );
}
