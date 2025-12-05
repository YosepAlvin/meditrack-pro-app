"use client";

import { useState, useEffect } from 'react';
import Appointments from "@/components/dashboard/appointments";
import { appointments as mockAppointments, medications as mockMedications } from '@/lib/data';
import type { Appointment, Medication } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

export default function JanjiTemuPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctor');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    // Deep copy to prevent direct mutation of imported data
    const allAppointments = JSON.parse(JSON.stringify(mockAppointments));
    const filteredAppointments = doctorId 
      ? allAppointments.filter((app: Appointment) => app.doctorId === doctorId)
      : allAppointments;
    
    setAppointments(filteredAppointments);
    setMedications(JSON.parse(JSON.stringify(mockMedications)));
  }, [doctorId]);


  const handleUpdateAppointmentStatus = (appointmentId: number, newStatus: Appointment['status']) => {
    setAppointments(prevApps =>
      prevApps.map(app =>
        app.id === appointmentId ? { ...app, status: newStatus } : app
      )
    );
  };

  const handlePrescribeAndUpdate = (appointmentId: number, medicationId: string, quantity: number) => {
    // Update medication stock
    setMedications(prevMeds =>
      prevMeds.map(med =>
        med.id === medicationId ? { ...med, stock: Math.max(0, med.stock - quantity) } : med
      )
    );

    // Update appointment status to 'Selesai'
    setAppointments(prevApps =>
      prevApps.map(app =>
        app.id === appointmentId ? { ...app, status: 'Selesai' } : app
      )
    );
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <Appointments 
           appointments={appointments}
           medications={medications}
           onUpdateStatus={handleUpdateAppointmentStatus}
           onPrescribe={handlePrescribeAndUpdate}
        />
      </div>
    </main>
  );
}
