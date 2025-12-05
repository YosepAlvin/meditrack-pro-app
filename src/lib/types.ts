export type Patient = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  lastVisit: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
};

export type Appointment = {
  id: number;
  patientName: string;
  doctorName: string;
  doctorId: string; // Tambahkan doctorId
  clinic: string;
  time: string;
  status: 'Terkonfirmasi' | 'Menunggu' | 'Dibatalkan' | 'Selesai' | 'Dipanggil';
  complaint: string;
  appointment_date: string;
};

export type Medication = {
  id: string;
  name: string;
  strength: string;
  stock: number;
  lowStockThreshold: number;
};

export type MedicalRecord = {
    id: string;
    patientName: string;
    doctorName: string;
    date: string;
    diagnosis: string;
    prescription: string;
};

export type PracticeSchedule = {
    id: string;
    doctorId: string;
    startTime: string;
    endTime: string;
    clinic: string;
    room: string;
    status: 'Sedang Berlangsung' | 'Selesai' | 'Belum Mulai';
}
