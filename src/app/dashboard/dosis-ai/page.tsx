import DosageSuggester from "@/components/dashboard/dosage-suggester";

export default function DosisAIPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <DosageSuggester />
      </div>
    </main>
  );
}
