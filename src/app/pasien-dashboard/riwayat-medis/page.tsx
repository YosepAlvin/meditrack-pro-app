import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function RiwayatMedisPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Riwayat Medis Anda</CardTitle>
                    <CardDescription>Berikut adalah ringkasan dari kunjungan dan diagnosa Anda sebelumnya.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4">
                                    <span>Kunjungan: 25 Oktober 2023</span>
                                    <Badge>Neurologi</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <p><strong>Dokter:</strong> Dr. Indah</p>
                                <p><strong>Diagnosa:</strong> Migrain kronis</p>
                                <p><strong>Catatan:</strong> Pasien disarankan untuk mengurangi stres dan diresepkan Sumatriptan.</p>
                                <p><strong>Resep:</strong> Sumatriptan 50mg</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4">
                                    <span>Kunjungan: 15 September 2023</span>
                                    <Badge>Pediatri</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <p><strong>Dokter:</strong> Dr. Gunawan</p>
                                <p><strong>Diagnosa:</strong> Infeksi telinga</p>
                                <p><strong>Catatan:</strong> Diberikan antibiotik Amoksisilin untuk 7 hari.</p>
                                <p><strong>Resep:</strong> Amoksisilin 250mg</p>
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4">
                                    <span>Kunjungan: 10 Agustus 2023</span>
                                    <Badge variant="secondary">Umum</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <p><strong>Dokter:</strong> Dr. Budi</p>
                                <p><strong>Diagnosa:</strong> Flu biasa</p>
                                <p><strong>Catatan:</strong> Disarankan istirahat cukup dan minum banyak cairan.</p>
                                <p><strong>Resep:</strong> Parasetamol 500mg</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </main>
    );
}
