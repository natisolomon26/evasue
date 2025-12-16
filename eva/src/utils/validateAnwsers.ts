import { IFormField } from "../models/Event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateAnswers(formFields: IFormField[], answers: Record<string, any>) {
  const missing: string[] = [];
  for (const field of formFields) {
    if (field.required) {
      const value = answers[field.label];
      if (value === undefined || value === null || String(value).trim() === "") {
        missing.push(field.label);
      }
    }
  }
  return { ok: missing.length === 0, missing };
}
