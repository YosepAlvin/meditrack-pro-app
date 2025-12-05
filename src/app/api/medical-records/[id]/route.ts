import { NextResponse } from 'next/server';
import { medicalRecords } from '@/lib/data';
import type { MedicalRecord } from '@/lib/types';

type Params = {
  id: string;
};

// GET (Get medical record by ID)
export async function GET(request: Request, context: { params: Params }) {
  const { id } = context.params;
  const record = medicalRecords.find((r) => r.id === id);

  if (!record) {
    return NextResponse.json({ message: 'Medical record not found' }, { status: 404 });
  }

  return NextResponse.json(record);
}

// PUT (Update medical record)
export async function PUT(request: Request, context: { params: Params }) {
    const { id } = context.params;
    try {
        const body: Partial<MedicalRecord> = await request.json();
        const recordIndex = medicalRecords.findIndex((r) => r.id === id);

        if (recordIndex === -1) {
            return NextResponse.json({ message: 'Medical record not found' }, { status: 404 });
        }

        // Update the record
        const updatedRecord = { ...medicalRecords[recordIndex], ...body };
        medicalRecords[recordIndex] = updatedRecord;

        return NextResponse.json(updatedRecord, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE (Delete medical record)
export async function DELETE(request: Request, context: { params: Params }) {
    const { id } = context.params;
    try {
        const recordIndex = medicalRecords.findIndex((r) => r.id === id);

        if (recordIndex === -1) {
            return NextResponse.json({ message: 'Medical record not found' }, { status: 404 });
        }

        // Remove the record
        medicalRecords.splice(recordIndex, 1);

        return NextResponse.json({ message: 'Medical record successfully deleted' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
