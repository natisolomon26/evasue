"use client";

import { useState } from "react";

interface FormField {
  label: string;
  type: "text" | "textarea" | "email" | "number" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
}

interface CreateEventModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshEvents: () => void;
}

export default function CreateEventModal({ open, setOpen, refreshEvents }: CreateEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);

  if (!open) return null;

  const addField = () => {
    setFormFields([
      ...formFields,
      { label: "", type: "text", required: false }
    ]);
  };

  const updateField = (i: number, key: keyof FormField, val: string | boolean) => {
    const copy = [...formFields];
    copy[i] = { ...copy[i], [key]: val };
    setFormFields(copy);
  };

  const createEvent = async () => {
    if (!title || !date) {
      return alert("Title and date are required");
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title, 
        date, 
        formFields: formFields.filter(field => field.label.trim() !== "") // Only send fields with labels
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return alert(error.error || "Failed to create event");
    }

    refreshEvents();
    setOpen(false);
    setTitle("");
    setDate("");
    setFormFields([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      {/* MAIN MODAL BOX */}
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl flex flex-col h-[80vh]">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Event</h2>
          <button
            className="text-gray-600 hover:text-black text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* BODY (scrollable) */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6">

            {/* LEFT COLUMN */}
            <div>
              <label className="font-semibold">Event Title</label>
              <input
                type="text"
                className="border p-3 w-full rounded-lg mt-1"
                placeholder="Example: NLS Event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="mt-6">
                <label className="font-semibold">Event Date</label>
                <input
                  type="datetime-local"
                  className="border p-3 w-full rounded-lg mt-1"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* DEBUG INFO */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Debug Info:</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Form Fields: {formFields.length}<br/>
                  Fields with labels: {formFields.filter(f => f.label.trim()).length}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - FORM BUILDER */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">Registration Form Fields</label>
                <button
                  onClick={addField}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  + Add Field
                </button>
              </div>

              <div className="space-y-4 mt-4">
                {formFields.map((field, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                  >
                    <input
                      type="text"
                      placeholder="Field Label (Full Name, Email, etc)"
                      className="border p-2 rounded w-full"
                      value={field.label}
                      onChange={(e) => updateField(i, "label", e.target.value)}
                    />

                    <select
                      className="border p-2 rounded w-full mt-2"
                      value={field.type}
                      onChange={(e) => updateField(i, "type", e.target.value as FormField['type'])}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Dropdown</option>
                      <option value="checkbox">Checkbox</option>
                    </select>

                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={field.required || false}
                        onChange={(e) => updateField(i, "required", e.target.checked)}
                      />
                      Required
                    </label>

                    {/* REMOVE FIELD */}
                    <button
                      className="text-red-600 text-sm mt-2 hover:text-red-800"
                      onClick={() =>
                        setFormFields(formFields.filter((_, idx) => idx !== i))
                      }
                    >
                      Remove Field
                    </button>
                  </div>
                ))}

                {formFields.length === 0 && (
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No form fields added yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Click Add Field to create registration form fields
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER - sticky */}
        <div className="p-4 border-t flex justify-end gap-4 bg-white">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400"
            onClick={createEvent}
            disabled={!title || !date}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}