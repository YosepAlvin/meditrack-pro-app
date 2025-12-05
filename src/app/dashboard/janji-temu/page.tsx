"use client";

import Appointments from "@/components/dashboard/appointments";

export default function JanjiTemuPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <Appointments />
      </div>
    </main>
  );
}
