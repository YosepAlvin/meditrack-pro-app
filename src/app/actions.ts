"use server";

import { suggestDosage, type DosageSuggestionInput } from '@/ai/flows/ai-dosage-suggestion';
import { z } from 'zod';

const DosageSuggestionInputSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.'),
  patientAge: z.coerce.number().min(0, 'Age must be a positive number.'),
  patientWeight: z.coerce.number().min(0, 'Weight must be a positive number.'),
  patientMedicalHistory: z.string().min(1, 'Medical history is required.'),
  medicationName: z.string().min(1, 'Medication name is required.'),
  medicationStrength: z.string().min(1, 'Medication strength is required.'),
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
      message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]]?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await suggestDosage(validatedFields.data as DosageSuggestionInput);
    return { 
      success: true, 
      message: 'Suggestion generated successfully.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return { 
        success: false, 
        message: 'An error occurred while generating the suggestion.' 
    };
  }
}
