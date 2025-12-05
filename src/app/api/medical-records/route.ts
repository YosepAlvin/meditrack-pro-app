import { NextResponse } from 'next/server';
import { medicalRecords } from '@/lib/data';
import type { MedicalRecord } from '@/lib/types';

// GET (Get all medical records)
export async function GET() {
  // In a real application, you might add pagination here
  return NextResponse.json(medicalRecords);
}

// POST (Create a new medical record)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { patientName, doctorName, diagnosis, prescription } = body;

        if (!patientName || !doctorName || !diagnosis) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newRecord: MedicalRecord = {
            id: `rec-${Date.now()}`,
            patientName,
            doctorName,
            date: new Date().toISOString().split('T')[0], // Set current date
            diagnosis,
            prescription: prescription || '',
        };

        medicalRecords.unshift(newRecord); // Add to the beginning of the array

        return NextResponse.json(newRecord, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
