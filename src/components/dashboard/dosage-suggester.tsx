"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, Lightbulb, AlertCircle } from "lucide-react";
import { getDosageSuggestion } from '@/app/actions';

const initialState = {
  success: false,
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Menghasilkan...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Dapatkan Saran
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
        <CardTitle>Penyaran Dosis AI</CardTitle>
        <CardDescription>Masukkan data pasien untuk menerima saran dosis dengan bantuan AI. Hanya untuk penggunaan profesional.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Nama Pasien</Label>
              <Input id="patientName" name="patientName" placeholder="cth., Budi Sanjoyo" />
              {state.errors?.patientName && <p className="text-sm text-destructive">{state.errors.patientName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientAge">Usia (tahun)</Label>
              <Input id="patientAge" name="patientAge" type="number" placeholder="cth., 45" />
               {state.errors?.patientAge && <p className="text-sm text-destructive">{state.errors.patientAge[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientWeight">Berat (kg)</Label>
              <Input id="patientWeight" name="patientWeight" type="number" placeholder="cth., 70" />
               {state.errors?.patientWeight && <p className="text-sm text-destructive">{state.errors.patientWeight[0]}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicationName">Nama Obat</Label>
              <Input id="medicationName" name="medicationName" placeholder="cth., Amoksisilin" />
               {state.errors?.medicationName && <p className="text-sm text-destructive">{state.errors.medicationName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicationStrength">Kekuatan</Label>
              <Input id="medicationStrength" name="medicationStrength" placeholder="cth., 500mg" />
               {state.errors?.medicationStrength && <p className="text-sm text-destructive">{state.errors.medicationStrength[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientMedicalHistory">Riwayat Medis</Label>
            <Textarea id="patientMedicalHistory" name="patientMedicalHistory" placeholder="cth., Alergi Penisilin, riwayat hipertensi." />
             {state.errors?.patientMedicalHistory && <p className="text-sm text-destructive">{state.errors.patientMedicalHistory[0]}</p>}
          </div>
          <SubmitButton />
        </form>

        {state.message && !state.success && !state.errors && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.success && state.data && (
            <Alert className="mt-4 border-accent">
                <Lightbulb className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent">Saran AI</AlertTitle>
                <AlertDescription className="space-y-2">
                    <p><strong>Dosis yang Disarankan:</strong> {state.data.suggestedDosage}</p>
                    <p><strong>Alasan:</strong> {state.data.reasoning}</p>
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
