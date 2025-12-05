import type { Patient, Appointment, Medication, MedicalRecord, PracticeSchedule } from './types';

export const patients: Patient[] = [
  { id: '1', name: 'Budi Sanjoyo', avatarUrl: 'https://picsum.photos/seed/1/40/40', email: 'budi.sanjoyo@example.com', lastVisit: '2023-10-26' },
  { id: '2', name: 'Siti Aminah', avatarUrl: 'https://picsum.photos/seed/2/40/40', email: 'siti.aminah@example.com', lastVisit: '2023-10-25' },
  { id: '3', name: 'Agus Setiawan', avatarUrl: 'https://picsum.photos/seed/3/40/40', email: 'agus.s@example.com', lastVisit: '2023-09-15' },
  { id: '4', name: 'Dewi Lestari', avatarUrl: 'https://picsum.photos/seed/4/40/40', email: 'dewi.l@example.com', lastVisit: '2023-11-01' },
  { id: '5', name: 'Eko Prasetyo', avatarUrl: 'https://picsum.photos/seed/5/40/40', email: 'eko.p@example.com', lastVisit: '2023-08-20' },
];

export const appointments: Appointment[] = [
  { id: '1', patientName: 'Budi Sanjoyo', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', time: '10:00', status: 'Terkonfirmasi', complaint: 'Nyeri dada' },
  { id: '2', patientName: 'Siti Aminah', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '11:30', status: 'Selesai', complaint: 'Sakit kepala sebelah' },
  { id: '3', patientName: 'Agus Setiawan', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', time: '13:00', status: 'Menunggu', complaint: 'Pusing dan mual' },
  { id: '4', patientName: 'Dewi Lestari', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '14:30', status: 'Menunggu', complaint: 'Kesemutan di tangan' },
];

export const medications: Medication[] = [
  { id: '1', name: 'Parasetamol', strength: '500mg', stock: 150, lowStockThreshold: 50 },
  { id: '2', name: 'Amoksisilin', strength: '250mg', stock: 80, lowStockThreshold: 30 },
  { id: '3', name: 'Ibuprofen', strength: '200mg', stock: 45, lowStockThreshold: 50 },
  { id: '4', name: 'Lisinopril', strength: '10mg', stock: 120, lowStockThreshold: 40 },
  { id: '5', name: 'Metformin', strength: '500mg', stock: 200, lowStockThreshold: 75 },
];

export const medicalRecords: MedicalRecord[] = [
  { id: 'rec-1', patientName: 'Siti Aminah', date: '2023-11-15', diagnosis: 'Migrain kronis', prescription: 'Sumatriptan 50mg' },
  { id: 'rec-2', patientName: 'Budi Sanjoyo', date: '2023-11-14', diagnosis: 'Hipertensi', prescription: 'Lisinopril 10mg' },
  { id: 'rec-3', patientName: 'Agus Setiawan', date: '2023-11-12', diagnosis: 'Infeksi Saluran Pernapasan Akut (ISPA)', prescription: 'Amoksisilin 250mg' },
  { id: 'rec-4', patientName: 'Dewi Lestari', date: '2023-11-10', diagnosis: 'Dermatitis Kontak', prescription: 'Krim hidrokortison' },
  { id: 'rec-5', patientName: 'Eko Prasetyo', date: '2023-11-08', diagnosis: 'Flu biasa', prescription: 'Parasetamol 500mg' },
];

export const practiceSchedules: PracticeSchedule[] = [
    { id: 'sch-1', startTime: '08:00', endTime: '12:00', clinic: 'Poli Umum', room: 'Ruang 3', status: 'Sedang Berlangsung' },
    { id: 'sch-2', startTime: '13:00', endTime: '17:00', clinic: 'Poli Jantung', room: 'Ruang 5', status: 'Belum Mulai' }
];
