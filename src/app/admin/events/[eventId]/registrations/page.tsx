// app/admin/events/[eventId]/registrations/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RegistrationTable, { Registration } from "@/components/admin/events/RegistrationTable";
import Loader from "@/components/Loader";

export default function RegistrationsPage() {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/registrations?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data.registrations);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch registrations", err);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registrations</h1>
      <RegistrationTable registrations={registrations} />
    </div>
  );
}
