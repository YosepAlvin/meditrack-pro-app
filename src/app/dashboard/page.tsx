
"use client";

import { useSearchParams } from 'next/navigation';
import {
  Activity,
  PlusCircle,
  BookUser,
  CalendarClock,
  ClipboardPlus,
  Users,
  Pill,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DoctorProfile from '@/components/dashboard/doctor/doctor-profile';
import PracticeSchedule from '@/components/dashboard/doctor/practice-schedule';
import PatientQueue from '@/components/dashboard/doctor/patient-queue';
import RecentMedicalRecords from '@/components/dashboard/doctor/recent-medical-records';
import Link from 'next/link';
import { doctors, appointments } from '@/lib/data';


function QuickActions() {
    const searchParams = useSearchParams();
    const doctor = searchParams.get('doctor') || 'dr-wahyu';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Akses Cepat</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Button variant="outline" className="flex-col h-auto" asChild>
          <Link href={`/dashboard/pasien?doctor=${doctor}`}>
            <ClipboardPlus className="mb-2" />
            <span>Tambah Rekam Medis</span>
          </Link>
        </Button>
        <Button variant="outline" className="flex-col h-auto" asChild>
          <Link href={`/dashboard/obat?doctor=${doctor}`}>
            <Pill className="mb-2" />
            <span>Tulis Resep</span>
          </Link>
        </Button>
        <Button variant="outline" className="flex-col h-auto" asChild>
          <Link href={`/dashboard/janji-temu?doctor=${doctor}`}>
            <CalendarClock className="mb-2" />
            <span>Lihat Jadwal</span>
          </Link>
        </Button>
        <Button variant="outline" className="flex-col h-auto" asChild>
          <Link href={`/dashboard/pasien?doctor=${doctor}`}>
            <BookUser className="mb-2" />
            <span>Cari Pasien</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MiniAnalytics() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('doctor') || 'dr-wahyu';
    const doctor = doctors.find(d => d.id === doctorId);

    const patientCount = appointments.filter(a => a.doctorName === doctor?.name).length;
    const completedPatientCount = appointments.filter(a => a.doctorName === doctor?.name && a.status === 'Selesai').length;


    return (
         <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pasien Hari Ini</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientCount}</div>
                <p className="text-xs text-muted-foreground">{completedPatientCount} pasien telah selesai</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resep Dibuat</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                 <p className="text-xs text-muted-foreground">Total resep hari ini</p>
              </CardContent>
            </Card>
          </div>
    )
}

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        {/* Kolom Kiri */}
        <div className="lg:col-span-2 space-y-4">
          <PracticeSchedule />
          <PatientQueue />
        </div>
        {/* Kolom Kanan */}
        <div className="space-y-4">
          <DoctorProfile />
          <QuickActions />
          <MiniAnalytics />
          <RecentMedicalRecords />
        </div>
      </div>
    </main>
  );
}
