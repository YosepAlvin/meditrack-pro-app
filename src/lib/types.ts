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
  status: 'Terkonfirmasi' | 'Menunggu' | 'Dibatalkan';
};

export type Medication = {
  id: string;
  name: string;
  strength: string;
  stock: number;
  lowStockThreshold: number;
};
