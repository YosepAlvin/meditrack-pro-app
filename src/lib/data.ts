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

// Data ini akan segera digantikan oleh panggilan API
export const appointments: Appointment[] = [
  { id: '1', patientName: 'Budi Sanjoyo', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', time: '10:00', status: 'Terkonfirmasi', complaint: 'Nyeri dada' },
  { id: '3', patientName: 'Agus Setiawan', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', time: '13:00', status: 'Menunggu', complaint: 'Pusing dan mual' },
  { id: '2', patientName: 'Siti Aminah', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '11:30', status: 'Selesai', complaint: 'Sakit kepala sebelah' },
  { id: '4', patientName: 'Dewi Lestari', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '14:30', status: 'Menunggu', complaint: 'Kesemutan di tangan' },
  { id: '8', patientName: 'Hariyanto', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '09:00', status: 'Menunggu', complaint: 'Sulit tidur' },
  { id: '9', patientName: 'Anak dari Eko Prasetyo', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', time: '09:30', status: 'Menunggu', complaint: 'Demam dan batuk' },
  { id: '10', patientName: 'Anak dari Fitriani', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', time: '10:30', status: 'Terkonfirmasi', complaint: 'Vaksinasi rutin' },
];

export const medications: Medication[] = [
  { id: '1', name: 'Parasetamol', strength: '500mg', stock: 150, lowStockThreshold: 50 },
  { id: '2', name: 'Amoksisilin', strength: '250mg', stock: 80, lowStockThreshold: 30 },
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
