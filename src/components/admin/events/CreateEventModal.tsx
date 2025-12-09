"use client";

import { useState } from "react";
import { DollarSign, Calendar, FileText } from "lucide-react";

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
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);

  if (!open) return null;

  const addField = () => {
    setFormFields([...formFields, { label: "", type: "text", required: false, options: [] }]);
  };

  const updateField = (i: number, key: keyof FormField, val: string | boolean) => {
    const copy = [...formFields];
    copy[i] = { ...copy[i], [key]: val };
    setFormFields(copy);
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setLocation("");
    setIsPaid(false);
    setPrice("");
    setFormFields([]);
  };

  const createEvent = async () => {
    if (!title || !date) return alert("Title and date are required");
    if (isPaid && (!price || parseFloat(price) <= 0)) return alert("Please enter a valid price for paid events");

    const eventData = {
      title,
      date,
      description: description || "",
      location: location || "",
      isPaid,
      price: isPaid ? parseFloat(price) : 0,
      formFields: formFields
        .filter(f => f.label.trim() !== "")
        .map(f => ({ label: f.label, type: f.type, required: f.required ?? false, options: f.options || [] })),
    };

    console.log("Creating event with data:", eventData);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to create event");

      refreshEvents();
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl flex flex-col h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create New Event</h2>
          <button className="text-gray-600 hover:text-black text-xl" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Event Info */}
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Event Basics
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-semibold block mb-1">Event Title *</label>
                    <input type="text" className="border p-3 w-full rounded-lg" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Event Date & Time *</label>
                    <input type="datetime-local" className="border p-3 w-full rounded-lg" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Description</label>
                    <textarea className="border p-3 w-full rounded-lg" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Location</label>
                    <input type="text" className="border p-3 w-full rounded-lg" value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" /> Payment Settings
                </h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={isPaid} onChange={e => { setIsPaid(e.target.checked); if (!e.target.checked) setPrice(""); }} className="w-5 h-5" />
                  <span className="font-medium">This is a paid event</span>
                </label>
                {isPaid && (
                  <div className="pl-8 mt-2">
                    <label className="font-semibold block mb-1">Ticket Price (ETB) *</label>
                    <input type="number" min="0" step="0.01" className="border p-3 w-full rounded-lg" value={price} onChange={e => setPrice(e.target.value)} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Form Builder */}
            <div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 h-full flex flex-col">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Registration Form
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-semibold">Form Fields</label>
                  <button onClick={addField} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Add Field</button>
                </div>
                <div className="space-y-4 overflow-y-auto flex-1">
                  {formFields.length === 0 && <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">No fields added yet</div>}
                  {formFields.map((field, i) => (
                    <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
                      <input type="text" placeholder="Field Label" className="border p-2 rounded w-full mb-2" value={field.label} onChange={e => updateField(i, "label", e.target.value)} />
                      <select className="border p-2 rounded w-full mb-2" value={field.type} onChange={e => updateField(i, "type", e.target.value as FormField['type'])}>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={field.required || false} onChange={e => updateField(i, "required", e.target.checked)} /> Required
                      </label>
                      <button className="text-red-600 text-sm mt-2 hover:text-red-800" onClick={() => setFormFields(formFields.filter((_, idx) => idx !== i))}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-4 bg-white">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setOpen(false)}>Cancel</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400" onClick={createEvent} disabled={!title || !date || (isPaid && !price)}>Create Event</button>
        </div>
      </div>
    </div>
  );
}
