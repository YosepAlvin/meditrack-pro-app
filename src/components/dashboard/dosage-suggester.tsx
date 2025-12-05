"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, Lightbulb } from "lucide-react";
import { getDosageSuggestion } from '@/app/actions';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Suggestion
        </>
      )}
    </Button>
  );
}

export default function DosageSuggester() {
  const [state, formAction] = useActionState(getDosageSuggestion, initialState);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>AI Dosage Suggester</CardTitle>
        <CardDescription>Enter patient data to receive an AI-assisted dosage suggestion. For professional use only.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" name="patientName" placeholder="e.g., John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientAge">Age (years)</Label>
              <Input id="patientAge" name="patientAge" type="number" placeholder="e.g., 45" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientWeight">Weight (kg)</Label>
              <Input id="patientWeight" name="patientWeight" type="number" placeholder="e.g., 70" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicationName">Medication Name</Label>
              <Input id="medicationName" name="medicationName" placeholder="e.g., Amoxicillin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicationStrength">Strength</Label>
              <Input id="medicationStrength" name="medicationStrength" placeholder="e.g., 500mg" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientMedicalHistory">Medical History</Label>
            <Textarea id="patientMedicalHistory" name="patientMedicalHistory" placeholder="e.g., Allergic to Penicillin, history of hypertension." />
          </div>
          <SubmitButton />
        </form>

        {state.message && !state.success && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.success && state.data && (
            <Alert className="mt-4 border-accent">
                <Lightbulb className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent">AI Suggestion</AlertTitle>
                <AlertDescription className="space-y-2">
                    <p><strong>Suggested Dosage:</strong> {state.data.suggestedDosage}</p>
                    <p><strong>Reasoning:</strong> {state.data.reasoning}</p>
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
