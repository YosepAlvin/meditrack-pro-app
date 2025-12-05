import DoctorManagement from "@/components/admin/doctor-management";

export default function ManajemenDokterPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <DoctorManagement />
      </div>
    </main>
  );
}
