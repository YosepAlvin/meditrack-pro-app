import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function DataKesehatanPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Data Kesehatan Pribadi</CardTitle>
                    <CardDescription>Perbarui data kesehatan Anda agar dokter dapat memberikan diagnosis yang lebih baik.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="blood-pressure">Tekanan Darah (cth., 120/80)</Label>
                            <Input id="blood-pressure" placeholder="120/80" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heart-rate">Detak Jantung (bpm)</Label>
                            <Input id="heart-rate" type="number" placeholder="75" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="blood-sugar">Gula Darah (mg/dL)</Label>
                            <Input id="blood-sugar" type="number" placeholder="90" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                            <Input id="weight" type="number" placeholder="70" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="height">Tinggi Badan (cm)</Label>
                            <Input id="height" type="number" placeholder="175" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="allergies">Alergi (pisahkan dengan koma)</Label>
                            <Input id="allergies" placeholder="Penisilin, Kacang" />
                        </div>
                    </div>
                    <Button>Simpan Perubahan</Button>
                </CardContent>
            </Card>
        </main>
    );
}
