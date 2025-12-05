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
  patientName: z.string().describe('The name of the patient.'),
  patientAge: z.number().describe('The age of the patient in years.'),
  patientWeight: z.number().describe('The weight of the patient in kilograms.'),
  patientMedicalHistory: z.string().describe('The medical history of the patient.'),
  medicationName: z.string().describe('The name of the medication.'),
  medicationStrength: z.string().describe('The strength of the medication (e.g., 200mg).'),
});
export type DosageSuggestionInput = z.infer<typeof DosageSuggestionInputSchema>;

const DosageSuggestionOutputSchema = z.object({
  suggestedDosage: z.string().describe('The suggested dosage of the medication for the patient, including units.'),
  reasoning: z.string().describe('The reasoning behind the dosage suggestion.'),
});
export type DosageSuggestionOutput = z.infer<typeof DosageSuggestionOutputSchema>;

export async function suggestDosage(input: DosageSuggestionInput): Promise<DosageSuggestionOutput> {
  return suggestDosageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dosageSuggestionPrompt',
  input: {schema: DosageSuggestionInputSchema},
  output: {schema: DosageSuggestionOutputSchema},
  prompt: `You are an AI assistant specializing in providing medication dosage suggestions for doctors.

  Based on the following patient data, suggest an appropriate dosage for the specified medication.

  Patient Name: {{{patientName}}}
  Patient Age: {{{patientAge}}} years
  Patient Weight: {{{patientWeight}}} kg
  Patient Medical History: {{{patientMedicalHistory}}}
  Medication Name: {{{medicationName}}}
  Medication Strength: {{{medicationStrength}}}

  Provide a suggested dosage and explain your reasoning.  Be specific about units. Format the output in JSON.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
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
