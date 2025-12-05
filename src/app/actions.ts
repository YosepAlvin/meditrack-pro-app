"use server";

import { suggestDosage, type DosageSuggestionInput } from '@/ai/flows/ai-dosage-suggestion';
import { z } from 'zod';

const DosageSuggestionInputSchema = z.object({
  patientName: z.string().min(1, 'Nama pasien harus diisi.'),
  patientAge: z.coerce.number({invalid_type_error: 'Usia harus berupa angka.'}).min(1, 'Usia harus diisi.'),
  patientWeight: z.coerce.number({invalid_type_error: 'Berat badan harus berupa angka.'}).min(1, 'Berat badan harus diisi.'),
  patientMedicalHistory: z.string().min(1, 'Riwayat medis harus diisi.'),
  medicationName: z.string().min(1, 'Nama obat harus diisi.'),
  medicationStrength: z.string().min(1, 'Kekuatan obat harus diisi.'),
});

type State = {
  success: boolean;
  message: string;
  errors?: {
    patientName?: string[];
    patientAge?: string[];
    patientWeight?: string[];
    patientMedicalHistory?: string[];
    medicationName?: string[];
    medicationStrength?: string[];
  } | null;
  data?: {
    suggestedDosage: string;
    reasoning: string;
  } | null;
}

export async function getDosageSuggestion(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = DosageSuggestionInputSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Input tidak valid. Harap periksa kembali isian Anda.",
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await suggestDosage(validatedFields.data as DosageSuggestionInput);
    return { 
      success: true, 
      message: 'Saran berhasil dibuat.',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return { 
        success: false, 
        message: 'Terjadi kesalahan saat membuat saran. Coba lagi nanti.',
        errors: null,
        data: null,
    };
  }
}
