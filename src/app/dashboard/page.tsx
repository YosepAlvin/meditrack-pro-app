import Overview from "@/components/dashboard/overview";
import Appointments from "@/components/dashboard/appointments";
import PatientLookup from "@/components/dashboard/patient-lookup";
import MedicationStock from "@/components/dashboard/medication-stock";
import DosageSuggester from "@/components/dashboard/dosage-suggester";

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-3 md:gap-8">
        <Overview />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
            <Appointments />
            <DosageSuggester />
        </div>
        <div className="space-y-4">
            <PatientLookup />
            <MedicationStock />
        </div>
      </div>
    </main>
  );
}
