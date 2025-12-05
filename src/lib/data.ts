import type { Patient, Appointment, Medication } from './types';

export const patients: Patient[] = [
  { id: '1', name: 'Budi Sanjoyo', avatarUrl: 'https://picsum.photos/seed/1/40/40', email: 'budi.sanjoyo@example.com', lastVisit: '2023-10-26' },
  { id: '2', name: 'Siti Aminah', avatarUrl: 'https://picsum.photos/seed/2/40/40', email: 'siti.aminah@example.com', lastVisit: '2023-10-25' },
  { id: '3', name: 'Agus Setiawan', avatarUrl: 'https://picsum.photos/seed/3/40/40', email: 'agus.s@example.com', lastVisit: '2023-09-15' },
  { id: '4', name: 'Dewi Lestari', avatarUrl: 'https://picsum.photos/seed/4/40/40', email: 'dewi.l@example.com', lastVisit: '2023-11-01' },
  { id: '5', name: 'Eko Prasetyo', avatarUrl: 'https://picsum.photos/seed/5/40/40', email: 'eko.p@example.com', lastVisit: '2023-08-20' },
];

export const appointments: Appointment[] = [
  { id: '1', patientName: 'Budi Sanjoyo', doctorName: 'Dr. Wahyu', clinic: 'Kardiologi', time: '10:00', status: 'Terkonfirmasi' },
  { id: '2', patientName: 'Siti Aminah', doctorName: 'Dr. Indah', clinic: 'Neurologi', time: '11:30', status: 'Terkonfirmasi' },
  { id: '3', patientName: 'Agus Setiawan', doctorName: 'Dr. Gunawan', clinic: 'Pediatri', time: '13:00', status: 'Menunggu' },
  { id: '4', patientName: 'Dewi Lestari', doctorName: 'Dr. Lestari', clinic: 'Dermatologi', time: '14:30', status: 'Dibatalkan' },
];

export const medications: Medication[] = [
  { id: '1', name: 'Parasetamol', strength: '500mg', stock: 150, lowStockThreshold: 50 },
  { id: '2', name: 'Amoksisilin', strength: '250mg', stock: 80, lowStockThreshold: 30 },
  { id: '3', name: 'Ibuprofen', strength: '200mg', stock: 45, lowStockThreshold: 50 },
  { id: '4', name: 'Lisinopril', strength: '10mg', stock: 120, lowStockThreshold: 40 },
  { id: '5', name: 'Metformin', strength: '500mg', stock: 200, lowStockThreshold: 75 },
];
