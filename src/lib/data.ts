import type { Patient, Appointment, Medication, MedicalRecord, PracticeSchedule, Doctor } from './types';

// Data ini sekarang hanya digunakan untuk tampilan awal atau fallback.
// Data utama akan diambil dari database melalui API.

export const doctors: Doctor[] = [
  { id: 'dr-wahyu', name: 'Dr. Wahyu', specialty: 'Spesialis Kardiologi', avatarUrl: 'https://picsum.photos/seed/101/100/100' },
  { id: 'dr-indah', name: 'Dr. Indah', specialty: 'Spesialis Neurologi', avatarUrl: 'https://picsum.photos/seed/102/100/100' },
  { id: 'dr-gunawan', name: 'Dr. Gunawan', specialty: 'Spesialis Pediatri', avatarUrl: 'https://picsum.photos/seed/103/100/100' },
];

export const patients: Patient[] = [
  { id: '1', name: 'Budi Sanjoyo', avatarUrl: 'https://picsum.photos/seed/1/40/40', email: 'budi.sanjoyo@example.com', lastVisit: '2023-10-26' },
  { id: '2', name: 'Siti Aminah', avatarUrl: 'https://picsum.photos/seed/2/40/40', email: 'siti.aminah@example.com', lastVisit: '2023-10-25' },
];

// Mengubah dari let menjadi const untuk mencegah mutasi global
export const appointments: Appointment[] = [
  { id: 1, patientName: 'Budi Sanjoyo', doctorName: 'Dr. Wahyu', doctorId: 'dr-wahyu', clinic: 'Kardiologi', time: '10:00', status: 'Terkonfirmasi', complaint: 'Nyeri dada', appointment_date: '2024-05-20' },
  { id: 3, patientName: 'Agus Setiawan', doctorName: 'Dr. Wahyu', doctorId: 'dr-wahyu', clinic: 'Kardiologi', time: '13:00', status: 'Menunggu', complaint: 'Pusing dan mual', appointment_date: '2024-05-20' },
  { id: 2, patientName: 'Siti Aminah', doctorName: 'Dr. Indah', doctorId: 'dr-indah', clinic: 'Neurologi', time: '11:30', status: 'Selesai', complaint: 'Sakit kepala sebelah', appointment_date: '2024-05-19' },
  { id: 4, patientName: 'Dewi Lestari', doctorName: 'Dr. Indah', doctorId: 'dr-indah', clinic: 'Neurologi', time: '14:30', status: 'Menunggu', complaint: 'Kesemutan di tangan', appointment_date: '2024-05-20' },
  { id: 8, patientName: 'Hariyanto', doctorName: 'Dr. Indah', doctorId: 'dr-indah', clinic: 'Neurologi', time: '09:00', status: 'Menunggu', complaint: 'Sulit tidur', appointment_date: '2024-05-20' },
  { id: 9, patientName: 'Anak dari Eko Prasetyo', doctorName: 'Dr. Gunawan', doctorId: 'dr-gunawan', clinic: 'Pediatri', time: '09:30', status: 'Menunggu', complaint: 'Demam dan batuk', appointment_date: '2024-05-20' },
  { id: 10, patientName: 'Anak dari Fitriani', doctorName: 'Dr. Gunawan', doctorId: 'dr-gunawan', clinic: 'Pediatri', time: '10:30', status: 'Terkonfirmasi', complaint: 'Vaksinasi rutin', appointment_date: '2024-05-20' },
];

export const medications: Medication[] = [
  { id: '1', name: 'Parasetamol', strength: '500mg', stock: 150, lowStockThreshold: 50 },
  { id: '2', name: 'Amoksisilin', strength: '250mg', stock: 80, lowStockThreshold: 30 },
  { id: '3', name: 'Aspirin', strength: '80mg', stock: 200, lowStockThreshold: 50 },
  { id: '4', name: 'Ibuprofen', strength: '400mg', stock: 120, lowStockThreshold: 40 },
  { id: '5', name: 'Metformin', strength: '500mg', stock: 100, lowStockThreshold: 30 },
  { id: '6', name: 'Lisinopril', strength: '10mg', stock: 75, lowStockThreshold: 25 },
  { id: '7', name: 'Amlodipine', strength: '5mg', stock: 90, lowStockThreshold: 30 },
  { id: '8', name: 'Simvastatin', strength: '20mg', stock: 110, lowStockThreshold: 40 },
  { id: '9', name: 'Omeprazole', strength: '20mg', stock: 60, lowStockThreshold: 20 },
  { id: '10', name: 'Cefixime', strength: '100mg', stock: 50, lowStockThreshold: 20 },
];

export const medicalRecords: MedicalRecord[] = [
    { id: 'rec-1', patientName: 'Siti Aminah', doctorName: 'Dr. Indah', date: '2023-11-15', diagnosis: 'Migrain kronis', prescription: 'Sumatriptan 50mg' },
    { id: 'rec-2', patientName: 'Budi Sanjoyo', doctorName: 'Dr. Wahyu', date: '2023-11-14', diagnosis: 'Hipertensi', prescription: 'Lisinopril 10mg' },
];

export const practiceSchedules: PracticeSchedule[] = [
    { id: 'sch-1', doctorId: 'dr-wahyu', startTime: '08:00', endTime: '12:00', clinic: 'Poli Jantung', room: 'Ruang 5', status: 'Sedang Berlangsung' },
    { id: 'sch-3', doctorId: 'dr-indah', startTime: '09:00', endTime: '13:00', clinic: 'Poli Saraf', room: 'Ruang 2', status: 'Sedang Berlangsung' },
    { id: 'sch-5', doctorId: 'dr-gunawan', startTime: '08:00', endTime: '12:00', clinic: 'Poli Anak', room: 'Ruang 1', status: 'Sedang Berlangsung' },
];
