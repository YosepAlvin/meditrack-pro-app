import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId'); // Menggunakan doctorId

  try {
    // Ambil tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().slice(0, 10);
    
    let query = 'SELECT * FROM appointments WHERE status != "Dibatalkan" AND appointment_date = ?';
    const params: string[] = [today];

    // Filter berdasarkan doctorId jika tersedia
    if (doctorId) {
      query += ' AND doctorId = ?';
      params.push(doctorId);
    }
    
    query += ' ORDER BY time ASC';

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
