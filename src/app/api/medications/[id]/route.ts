import { NextResponse } from 'next/server';
import db from '@/lib/db';

type Params = {
  id: string;
};

// PUT (Update a medication)
export async function PUT(request: Request, context: { params: Params }) {
  const { id } = context.params;
  try {
    const { name, strength, stock, lowStockThreshold } = await request.json();
    
    if (!name || stock === undefined || lowStockThreshold === undefined) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    await db.query(
      'UPDATE medications SET name = ?, strength = ?, stock = ?, lowStockThreshold = ? WHERE id = ?',
      [name, strength, stock, lowStockThreshold, id]
    );

    return NextResponse.json({ message: 'Obat berhasil diperbarui' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a medication
export async function DELETE(request: Request, context: { params: Params }) {
  const { id } = context.params;
  try {
    const [result]: any[] = await db.query('DELETE FROM medications WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'Obat tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Obat berhasil dihapus' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
