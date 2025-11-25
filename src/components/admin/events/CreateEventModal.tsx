"use client";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateEventModal({ open, setOpen, refreshEvents }: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formFields, setFormFields] = useState<any[]>([]);

  if (!open) return null;

  const addField = () => {
    setFormFields([
      ...formFields,
      { label: "", type: "text", required: false }
    ]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (i: number, key: string, val: any) => {
    const copy = [...formFields];
    copy[i][key] = val;
    setFormFields(copy);
  };

  const createEvent = async () => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, formFields }),
    });

    if (!res.ok) return alert("Failed to create event");

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
                placeholder="Example: Charity Run"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="mt-6">
                <label className="font-semibold">Event Date</label>
                <input
                  type="datetime-local"
                  className="border p-3 w-full rounded-lg mt-1"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* RIGHT COLUMN - FORM BUILDER */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-semibold">Registration Form Fields</label>
                <button
                  onClick={addField}
                  className="bg-black text-white px-4 py-2 rounded-lg"
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
                      onChange={(e) => updateField(i, "type", e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Dropdown</option>
                    </select>

                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateField(i, "required", e.target.checked)
                        }
                      />
                      Required
                    </label>

                    {/* REMOVE FIELD */}
                    <button
                      className="text-red-600 text-sm mt-2"
                      onClick={() =>
                        setFormFields(formFields.filter((_, idx) => idx !== i))
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER - sticky */}
        <div className="p-4 border-t flex justify-end gap-4 bg-white">
          <button className="px-4 py-2" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
            onClick={createEvent}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
