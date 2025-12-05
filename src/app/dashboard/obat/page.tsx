import MedicationStock from "@/components/dashboard/medication-stock";

export default function ObatPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <MedicationStock />
      </div>
    </main>
  );
}
