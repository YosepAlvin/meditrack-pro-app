import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  const { appointmentId, medicationId, quantity } = await request.json();

  if (!appointmentId || !medicationId || !quantity) {
    return NextResponse.json({ message: 'Data resep tidak lengkap.' }, { status: 400 });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Ambil stok obat saat ini
    const [medRows]: any[] = await connection.query('SELECT stock FROM medications WHERE id = ? FOR UPDATE', [medicationId]);
    if (medRows.length === 0) {
      throw new Error('Obat tidak ditemukan.');
    }
    const currentStock = medRows[0].stock;

    // 2. Validasi stok
    if (currentStock < quantity) {
      throw new Error('Stok obat tidak mencukupi.');
    }

    // 3. Kurangi stok obat
    const newStock = currentStock - quantity;
    await connection.query('UPDATE medications SET stock = ? WHERE id = ?', [newStock, medicationId]);

    // 4. Update status janji temu menjadi 'Selesai'
    await connection.query('UPDATE appointments SET status = "Selesai" WHERE id = ?', [appointmentId]);

    await connection.commit();

    return NextResponse.json({ message: 'Resep berhasil diberikan dan janji temu diselesaikan.' }, { status: 200 });

  } catch (error: any) {
    await connection.rollback();
    console.error('Prescription Error:', error.message);
    return NextResponse.json({ message: error.message || 'Gagal memproses resep.' }, { status: 500 });
  } finally {
    connection.release();
  }
}
