import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Doctor } from '@/lib/types';

// Handler untuk GET (mengambil semua dokter)
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        d.id, 
        u.name, 
        d.specialty, 
        u.avatar_url AS avatarUrl 
      FROM doctors d 
      JOIN users u ON d.user_id = u.id
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handler untuk POST (menambah dokter baru)
export async function POST(request: Request) {
  try {
    const { name, specialty } = await request.json();
    const id = `dr-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const email = `${id}@example.com`;
    const avatarUrl = `https://picsum.photos/seed/${id}/100/100`;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // 1. Buat entry di tabel users
      const [userResult] = await connection.query(
        'INSERT INTO users (name, email, password, role, avatar_url) VALUES (?, ?, ?, ?, ?)',
        [name, email, 'dokter123', 'dokter', avatarUrl]
      );
      const userId = (userResult as any).insertId;

      // 2. Buat entry di tabel doctors
      await connection.query(
        'INSERT INTO doctors (id, user_id, specialty) VALUES (?, ?, ?)',
        [id, userId, specialty]
      );

      await connection.commit();

      const newDoctor: Doctor = { id, name, specialty, avatarUrl };
      return NextResponse.json(newDoctor, { status: 201 });

    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
