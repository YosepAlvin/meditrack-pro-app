'use server';

/**
 * @fileOverview This file implements a Genkit flow for suggesting medication dosages based on patient data.
 *
 * - suggestDosage - A function that takes patient data and medication name as input and returns a dosage suggestion.
 * - DosageSuggestionInput - The input type for the suggestDosage function.
 * - DosageSuggestionOutput - The return type for the suggestDosage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DosageSuggestionInputSchema = z.object({
  patientName: z.string().describe('Nama pasien.'),
  patientAge: z.number().describe('Usia pasien dalam tahun.'),
  patientWeight: z.number().describe('Berat badan pasien dalam kilogram.'),
  patientMedicalHistory: z.string().describe('Riwayat medis pasien.'),
  medicationName: z.string().describe('Nama obat.'),
  medicationStrength: z.string().describe('Kekuatan obat (mis., 200mg).'),
});
export type DosageSuggestionInput = z.infer<typeof DosageSuggestionInputSchema>;

const DosageSuggestionOutputSchema = z.object({
  suggestedDosage: z.string().describe('Dosis obat yang disarankan untuk pasien, termasuk unit.'),
  reasoning: z.string().describe('Alasan di balik saran dosis.'),
});
export type DosageSuggestionOutput = z.infer<typeof DosageSuggestionOutputSchema>;

export async function suggestDosage(input: DosageSuggestionInput): Promise<DosageSuggestionOutput> {
  return suggestDosageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dosageSuggestionPrompt',
  input: {schema: DosageSuggestionInputSchema},
  output: {schema: DosageSuggestionOutputSchema},
  prompt: `Anda adalah asisten AI yang berspesialisasi dalam memberikan saran dosis obat untuk dokter.

  Berdasarkan data pasien berikut, sarankan dosis yang sesuai untuk obat yang ditentukan.

  Nama Pasien: {{{patientName}}}
  Usia Pasien: {{{patientAge}}} tahun
  Berat Pasien: {{{patientWeight}}} kg
  Riwayat Medis Pasien: {{{patientMedicalHistory}}}
  Nama Obat: {{{medicationName}}}
  Kekuatan Obat: {{{medicationStrength}}}

  Berikan dosis yang disarankan dan jelaskan alasan Anda. Spesifikasikan unitnya. Format output dalam JSON.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const suggestDosageFlow = ai.defineFlow(
  {
    name: 'suggestDosageFlow',
    inputSchema: DosageSuggestionInputSchema,
    outputSchema: DosageSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
