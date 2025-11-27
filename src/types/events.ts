// In your types/events.ts
export interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdBy: string;
  isPaid: boolean;        // Change from optional to required
  price: number;          // Change from optional to required
  formFields: FormField[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registrations: any[];
  createdAt: string;
  updatedAt: string;
}

interface FormField {
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
}