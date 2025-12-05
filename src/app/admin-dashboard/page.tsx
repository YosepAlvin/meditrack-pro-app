import Overview from "@/components/dashboard/overview";
import Appointments from "@/components/dashboard/appointments";
import PatientLookup from "@/components/dashboard/patient-lookup";
import MedicationStock from "@/components/dashboard/medication-stock";

function UserManagementCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Pengguna</CardTitle>
                <CardDescription>Total pengguna terdaftar di sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 Admin, 2 Dokter, 1 Pasien</p>
            </CardContent>
        </Card>
    )
}

export default function AdminDashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Overview />
        <UserManagementCard />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-4">
            <Appointments />
        </div>
        <div className="space-y-4">
            <PatientLookup />
            <MedicationStock />
        </div>
      </div>
    </main>
  );
}
