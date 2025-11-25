"use client";

import { useState } from "react";

interface FormField {
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
}

interface EventType {
  _id: string;
  title: string;
  formFields: FormField[];
}

interface RegistrationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: EventType;
  onSuccess?: () => void;
}

export default function RegistrationModal({ open, setOpen, event, onSuccess }: RegistrationModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (label: string, value: any) => {
    setAnswers(prev => ({ ...prev, [label]: value }));
  };

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setAnswers(prev => ({ ...prev, [label]: checked }));
  };

  const handleSubmit = async () => {
    for (const field of event.formFields) {
      if (field.required && !answers[field.label]) {
        return alert(`Field "${field.label}" is required`);
      }
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${event._id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register");

      onSuccess?.();
      setOpen(false);
      setAnswers({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{event.title} - Registration</h2>
          <button 
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.formFields.map((field, i) => (
            <div key={i} className={`flex flex-col ${field.type === 'checkbox' ? 'flex-row items-center gap-2' : ''}`}>
              {field.type === "checkbox" ? (
                <>
                  <input
                    type="checkbox"
                    checked={answers[field.label] || false}
                    onChange={e => handleCheckboxChange(field.label, e.target.checked)}
                    className="border p-2 rounded"
                  />
                  <label className="font-semibold">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                  </label>
                </>
              ) : (
                <>
                  <label className="font-semibold">
                    {field.label}{field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === "text" || field.type === "number" ? (
                    <input
                      type={field.type}
                      value={answers[field.label] || ""}
                      onChange={e => handleChange(field.label, e.target.value)}
                      className="border p-2 rounded mt-1"
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={answers[field.label] || ""}
                      onChange={e => handleChange(field.label, e.target.value)}
                      className="border p-2 rounded mt-1"
                      rows={3}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={answers[field.label] || ""}
                      onChange={e => handleChange(field.label, e.target.value)}
                      className="border p-2 rounded mt-1"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : null}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button 
            onClick={() => setOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}