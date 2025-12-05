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
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  clinic: string;
  time: string;
  status: 'Terkonfirmasi' | 'Menunggu' | 'Dibatalkan' | 'Selesai' | 'Dipanggil';
  complaint: string;
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
    date: string;
    diagnosis: string;
    prescription: string;
};

export type PracticeSchedule = {
    id: string;
    startTime: string;
    endTime: string;
    clinic: string;
    room: string;
    status: 'Sedang Berlangsung' | 'Selesai' | 'Belum Mulai';
}
