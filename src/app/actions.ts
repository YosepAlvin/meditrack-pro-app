"use server";

import { suggestDosage, type DosageSuggestionInput } from '@/ai/flows/ai-dosage-suggestion';
import { z } from 'zod';

const DosageSuggestionInputSchema = z.object({
  patientName: z.string().min(1, 'Nama pasien harus diisi.'),
  patientAge: z.coerce.number().min(0, 'Usia harus berupa angka positif.'),
  patientWeight: z.coerce.number().min(0, 'Berat badan harus berupa angka positif.'),
  patientMedicalHistory: z.string().min(1, 'Riwayat medis harus diisi.'),
  medicationName: z.string().min(1, 'Nama obat harus diisi.'),
  medicationStrength: z.string().min(1, 'Kekuatan obat harus diisi.'),
});

type State = {
  success: boolean;
  message: string;
  data?: {
    suggestedDosage: string;
    reasoning: string;
  };
}

export async function getDosageSuggestion(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = DosageSuggestionInputSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]]?.[0] || 'Input tidak valid.',
    };
  }

  try {
    const result = await suggestDosage(validatedFields.data as DosageSuggestionInput);
    return { 
      success: true, 
      message: 'Saran berhasil dibuat.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return { 
        success: false, 
        message: 'Terjadi kesalahan saat membuat saran.' 
    };
  }
}
