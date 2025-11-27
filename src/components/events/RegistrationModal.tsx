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
  isPaid?: boolean;
  price?: number;
}

interface RegistrationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: EventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (formData: any) => void; // Changed to accept form data
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
    // Validate required fields
    for (const field of event.formFields) {
      if (field.required && !answers[field.label]) {
        return alert(`Field "${field.label}" is required`);
      }
    }

    setLoading(true);
    
    try {
      // Instead of calling the API directly, pass the form data to parent
      // The parent component will handle payment flow for paid events
      // or direct registration for free events
      
      onSuccess(answers); // Pass form data to parent
      
      // Don't close modal here - parent will handle closing after payment
      // setOpen(false);
      // setAnswers({});
      
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
          <div>
            <h2 className="text-xl font-bold">{event.title} - Registration</h2>
            {event.isPaid && event.price && (
              <p className="text-sm text-purple-600 mt-1">
                Paid Event - ETB {event.price} (Payment required after form submission)
              </p>
            )}
          </div>
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
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? "Processing..." : event.isPaid ? "Continue to Payment" : "Submit Registration"}
          </button>
        </div>

        {/* Payment Info Note */}
        {event.isPaid && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>Note:</strong> After submitting this form, youll be redirected to complete your payment. 
              Your registration will only be confirmed after successful payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}