// lib/pdfGenerator.ts - COMPACT RECEIPT (CORRECTED PARAMETER)
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface IFormField {
  label: string;
  type: "text" | "textarea" | "email" | "number" | "select" | "checkbox";
  options?: string[];
  required?: boolean;
}

export interface ReceiptData {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    isPaid: boolean;
    price: number;
    formFields: IFormField[];
  };
  registration: {
    _id: string;
    answers: Map<string, string> | Record<string, string>;
    registeredAt: string;
    isGuest: boolean;
    userId: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function generateReceiptPDF(data: ReceiptData) { // ✅ FIXED: "data: ReceiptData"
  const { event, registration, user } = data; // ✅ now works

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([450, 550]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const primary = rgb(0.1, 0.1, 0.1);
  const light = rgb(0.5, 0.5, 0.5);
  const paidBg = rgb(0.9, 0.98, 0.95);
  const paidText = rgb(0.0, 0.5, 0.3);
  const headerBg = rgb(0.1, 0.3, 0.6);

  // Normalize answers
  let answers: Record<string, string> = {};
  if (registration.answers instanceof Map) {
    answers = Object.fromEntries(registration.answers);
  } else {
    answers = { ...registration.answers };
  }

  // Get attendee name
  const name = answers['Full Name'] || answers['Name'] || answers['fullName'] || user.name || 'Attendee';

  // Extract up to 2 extra fields (skip name-like and email if not needed)
  const extraFields: { label: string; value: string }[] = [];
  const skipLabels = ['Full Name', 'Name', 'fullName'];

  for (const field of event.formFields) {
    if (extraFields.length >= 2) break;
    const val = answers[field.label]?.trim();
    if (val && !skipLabels.includes(field.label)) {
      // Honor: if email is in form but you don't want to show it, skip
      if (field.label === 'Email' && !data.event.formFields.some(f => f.label === 'Email')) {
        // This won't happen, but just in case
      }
      // Since your debug shows Email in answers, and form includes it,
      // we show it — unless you want to hide it via showUserEmail
      // For now: show all non-name fields
      extraFields.push({ label: field.label, value: val });
    }
  }

  // === HEADER ===
  page.drawRectangle({
    x: 0,
    y: height - 90,
    width,
    height: 90,
    color: headerBg,
  });

  page.drawText("EvaSUE", {
    x: width / 2 - 35,
    y: height - 45,
    size: 18,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  const title = event.title.length > 28 ? event.title.substring(0, 28) + "..." : event.title;
  page.drawText(title, {
    x: width / 2 - (7 * title.length) / 2,
    y: height - 68,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  // === ATTENDEE NAME ===
  let y = height - 120;
  page.drawText(name.toUpperCase(), {
    x: width / 2 - (9 * name.length) / 2,
    y,
    size: 16,
    font: boldFont,
    color: primary,
  });

  y -= 40;

  // === EVENT DATE & TIME ===
  const eventDate = new Date(event.date);
  const dateLine = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeLine = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  page.drawText(dateLine, {
    x: width / 2 - 50,
    y,
    size: 14,
    font: boldFont,
    color: primary,
  });
  y -= 22;
  page.drawText(timeLine, {
    x: width / 2 - 30,
    y,
    size: 14,
    font: boldFont,
    color: primary,
  });

  y -= 30;

  // === EXTRA FIELDS ===
  for (const field of extraFields) {
    const display = `${field.label}: ${field.value.length > 20 ? field.value.substring(0, 20) + '...' : field.value}`;
    page.drawText(display, {
      x: width / 2 - 80,
      y,
      size: 10,
      font,
      color: light,
    });
    y -= 18;
  }

  y -= 10;

  // === PAID BADGE ===
  if (event.isPaid && event.price > 0) {
    page.drawRectangle({
      x: width / 2 - 50,
      y: y - 20,
      width: 100,
      height: 24,
      color: paidBg,
      borderColor: paidText,
      borderWidth: 1,
    });
    page.drawText("PAID", {
      x: width / 2 - 30,
      y: y - 5,
      size: 12,
      font: boldFont,
      color: paidText,
    });
  } else {
    page.drawText("🎟️ FREE ADMISSION", {
      x: width / 2 - 60,
      y: y - 5,
      size: 12,
      font: boldFont,
      color: light,
    });
  }

  // === FOOTER ===
  page.drawText("Present this receipt at entry", {
    x: width / 2 - 80,
    y: 60,
    size: 9,
    font,
    color: light,
  });
  page.drawText("support@evasue.net", {
    x: width / 2 - 55,
    y: 45,
    size: 8,
    font,
    color: light,
  });

  return await pdfDoc.save();
}