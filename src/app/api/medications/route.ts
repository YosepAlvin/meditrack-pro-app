import { NextResponse } from 'next/server';
import db from '@/lib/db';
import type { Medication } from '@/lib/types';

// GET all medications
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM medications ORDER BY name ASC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new medication
export async function POST(request: Request) {
  try {
    const { name, strength, stock, lowStockThreshold } = await request.json();

    if (!name || stock === undefined || lowStockThreshold === undefined) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    const [result] = await db.query(
      'INSERT INTO medications (name, strength, stock, lowStockThreshold) VALUES (?, ?, ?, ?)',
      [name, strength, stock, lowStockThreshold]
    );

    const insertId = (result as any).insertId;
    const newMedication: Medication = { id: insertId, name, strength, stock, lowStockThreshold };

    return NextResponse.json(newMedication, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
