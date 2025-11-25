

// In @/types/events.ts
export interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  formFields: FormField[]; // Make sure this exists
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registrations: any[];
}

interface FormField {
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
}