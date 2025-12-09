// types/index.ts
export type FieldType = "text" | "email" | "number" | "textarea" | "select" | "checkbox";

export interface FormField {
  _id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  isPaid: boolean;
  price: number;
  formFields: FormField[];
  registrationsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  events: Event[];
}

export interface RegistrationResponse {
  registrationId: string;
  checkoutUrl: string;
  txRef: string;
  error?: string;
}