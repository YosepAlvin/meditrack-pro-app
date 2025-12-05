import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorName = searchParams.get('doctorName');

  try {
    let query = 'SELECT * FROM appointments WHERE status != "Dibatalkan"';
    const params: string[] = [];

    if (doctorName) {
      query += ' AND doctor_name = ?';
      params.push(doctorName);
    }
    
    query += ' ORDER BY time ASC';

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
