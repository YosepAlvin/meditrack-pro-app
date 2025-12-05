import type { Patient, Appointment, Medication } from './types';

export const patients: Patient[] = [
  { id: '1', name: 'John Doe', avatarUrl: 'https://picsum.photos/seed/1/40/40', email: 'john.doe@example.com', lastVisit: '2023-10-26' },
  { id: '2', name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/2/40/40', email: 'jane.smith@example.com', lastVisit: '2023-10-25' },
  { id: '3', name: 'Robert Johnson', avatarUrl: 'https://picsum.photos/seed/3/40/40', email: 'robert.j@example.com', lastVisit: '2023-09-15' },
  { id: '4', name: 'Emily Davis', avatarUrl: 'https://picsum.photos/seed/4/40/40', email: 'emily.d@example.com', lastVisit: '2023-11-01' },
  { id: '5', name: 'Michael Brown', avatarUrl: 'https://picsum.photos/seed/5/40/40', email: 'michael.b@example.com', lastVisit: '2023-08-20' },
];

export const appointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', doctorName: 'Dr. Williams', clinic: 'Cardiology', time: '10:00 AM', status: 'Confirmed' },
  { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Jones', clinic: 'Neurology', time: '11:30 AM', status: 'Confirmed' },
  { id: '3', patientName: 'Robert Johnson', doctorName: 'Dr. Garcia', clinic: 'Pediatrics', time: '01:00 PM', status: 'Pending' },
  { id: '4', patientName: 'Emily Davis', doctorName: 'Dr. Miller', clinic: 'Dermatology', time: '02:30 PM', status: 'Cancelled' },
];

export const medications: Medication[] = [
  { id: '1', name: 'Paracetamol', strength: '500mg', stock: 150, lowStockThreshold: 50 },
  { id: '2', name: 'Amoxicillin', strength: '250mg', stock: 80, lowStockThreshold: 30 },
  { id: '3', name: 'Ibuprofen', strength: '200mg', stock: 45, lowStockThreshold: 50 },
  { id: '4', name: 'Lisinopril', strength: '10mg', stock: 120, lowStockThreshold: 40 },
  { id: '5', name: 'Metformin', strength: '500mg', stock: 200, lowStockThreshold: 75 },
];
