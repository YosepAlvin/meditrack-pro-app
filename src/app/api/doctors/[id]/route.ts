import { NextResponse } from 'next/server';
import db from '@/lib/db';

type Params = {
  id: string;
};

// Handler untuk PUT (update dokter)
export async function PUT(request: Request, context: { params: Params }) {
  const { id } = context.params;
  try {
    const { name, specialty } = await request.json();

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [doctorRows]: any[] = await connection.query('SELECT user_id FROM doctors WHERE id = ?', [id]);
        
        if (doctorRows.length === 0) {
            return NextResponse.json({ message: 'Dokter tidak ditemukan' }, { status: 404 });
        }
        
        const userId = doctorRows[0].user_id;

        // Update tabel users
        await connection.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
        
        // Update tabel doctors
        await connection.query('UPDATE doctors SET specialty = ? WHERE id = ?', [specialty, id]);

        await connection.commit();

        return NextResponse.json({ id, name, specialty }, { status: 200 });

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

// Handler untuk DELETE (hapus dokter)
export async function DELETE(request: Request, context: { params: Params }) {
  const { id } = context.params;
  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [doctorRows]: any[] = await connection.query('SELECT user_id FROM doctors WHERE id = ?', [id]);
        
        if (doctorRows.length === 0) {
            return NextResponse.json({ message: 'Dokter tidak ditemukan' }, { status: 404 });
        }

        const userId = doctorRows[0].user_id;
        
        // Hapus dari tabel doctors dulu
        await connection.query('DELETE FROM doctors WHERE id = ?', [id]);
        
        // Hapus dari tabel users
        await connection.query('DELETE FROM users WHERE id = ?', [userId]);

        await connection.commit();

        return NextResponse.json({ message: 'Dokter berhasil dihapus' }, { status: 200 });

    } catch (err) {
        await connection.rollback();
        // Jika ada janji temu, dll, database akan menolak penghapusan.
        // Kita bisa tangani error foreign key di sini.
        console.error("Error during transaction:", err);
        return NextResponse.json({ message: 'Gagal menghapus dokter, mungkin karena terkait data lain.' }, { status: 409 });
    } finally {
        connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
