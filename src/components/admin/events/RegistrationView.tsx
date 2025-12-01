"use client";

import { useState, useEffect } from "react";
import { EventType } from "@/types/events";

interface Registration {
  userId: string;
  answers: Record<string, string>;
  registeredAt: string;
  _id: string;
}

interface RegistrationsViewProps {
  selectedEvent: EventType | null;
  onBack: () => void;
}

export default function RegistrationsView({ selectedEvent, onBack }: RegistrationsViewProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);

  // Fetch registrations for the selected event
  const fetchRegistrations = async (eventId: string) => {
    setLoadingRegs(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`);
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch registrations");
    } finally {
      setLoadingRegs(false);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      fetchRegistrations(selectedEvent._id);
    }
  }, [selectedEvent]);

  const exportRegistrations = () => {
    if (!selectedEvent || registrations.length === 0) return;
    
    const csvContent = [
      ["User ID", "Registered At", ...Object.keys(registrations[0]?.answers || {})],
      ...registrations.map(reg => [
        reg.userId,
        new Date(reg.registeredAt).toLocaleString(),
        ...Object.values(reg.answers)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedEvent.title}-registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Back button and header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span>←</span>
            Back to Events
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedEvent?.title}</h2>
            <p className="text-gray-600">Registrations</p>
          </div>
        </div>
        
        {registrations.length > 0 && (
          <button
            onClick={exportRegistrations}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>📥</span>
            Export CSV
          </button>
        )}
      </div>

      {/* Registrations Table */}
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">User ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Registration Details</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loadingRegs ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : registrations.length > 0 ? (
                registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                      {reg.userId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {Object.entries(reg.answers).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium text-gray-700 min-w-[120px]">{key}:</span>
                            <span className="text-gray-900 ml-2">{String(value)}</span>
                          </div>
                        ))}
                        {Object.keys(reg.answers).length === 0 && (
                          <span className="text-gray-500 italic">No answers provided</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(reg.registeredAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center">
                    <div className="text-gray-500">
                      <div className="text-4xl mb-2">👥</div>
                      <div className="font-medium">No registrations yet</div>
                      <div className="text-sm mt-1">
                        Registrations will appear here once users sign up
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Stats */}
      {!loadingRegs && registrations.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-lg font-semibold text-blue-900 mb-2">
            Registration Summary
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Registrations:</span> {registrations.length}
            </div>
            <div>
              <span className="font-medium">Latest Registration:</span>{" "}
              {new Date(Math.max(...registrations.map(r => new Date(r.registeredAt).getTime())))
                .toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}