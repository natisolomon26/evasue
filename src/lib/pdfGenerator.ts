// lib/pdfGenerator.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface ReceiptData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export async function generateReceiptPDF(data: ReceiptData) {
  const { event, registration, user } = data;
  
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  
  // Load fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Brand colors - EvaSUE colors
  const primaryColor = rgb(0.1, 0.3, 0.6); // Dark blue
  const secondaryColor = rgb(0.9, 0.2, 0.1); // Red accent
  const accentColor = rgb(0.2, 0.6, 0.3); // Green accent
  const textColor = rgb(0.2, 0.2, 0.2);
  const lightTextColor = rgb(0.5, 0.5, 0.5);
  
  // ===== HEADER SECTION =====
  // Background header
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.95, 0.95, 0.98),
  });
  
  // EvaSUE Logo/Title
  page.drawText('EvaSUE', {
    x: 50,
    y: height - 60,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });
  
  page.drawText('EVANGELICAL STUDENTS UNION OF ETHIOPIA', {
    x: 50,
    y: height - 85,
    size: 10,
    font: font,
    color: lightTextColor,
  });
  
  page.drawText('REGISTRATION CONFIRMATION', {
    x: 50,
    y: height - 105,
    size: 14,
    font: boldFont,
    color: secondaryColor,
  });
  
  // Receipt ID and Date
  const receiptId = registration._id?.toString().slice(-8).toUpperCase() || 'N/A';
  const currentDate = new Date().toLocaleDateString();
  
  page.drawText(`Receipt #: ${receiptId}`, {
    x: width - 200,
    y: height - 70,
    size: 10,
    font: font,
    color: lightTextColor,
  });
  
  page.drawText(`Generated: ${currentDate}`, {
    x: width - 200,
    y: height - 85,
    size: 10,
    font: font,
    color: lightTextColor,
  });
  
  let yPosition = height - 160;
  
  // ===== EVENT INFORMATION SECTION =====
  page.drawText('EVENT DETAILS', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 25;
  
  // Event info box
  page.drawRectangle({
    x: 50,
    y: yPosition - 90,
    width: width - 100,
    height: 90,
    color: rgb(0.98, 0.98, 1),
    borderColor: primaryColor,
    borderWidth: 1,
  });
  
  const eventInfo = [
    { label: 'Event Title:', value: event.title || 'N/A' },
    { label: 'Date & Time:', value: event.date ? new Date(event.date).toLocaleString() : 'TBA' },
    { label: 'Location:', value: event.location || 'To be announced' },
    { label: 'Organizer:', value: 'EvaSUE' }
  ];
  
  eventInfo.forEach((info, index) => {
    const infoY = yPosition - (index * 20);
    
    page.drawText(info.label, {
      x: 70,
      y: infoY,
      size: 10,
      font: boldFont,
      color: textColor,
    });
    
    page.drawText(info.value, {
      x: 150,
      y: infoY,
      size: 10,
      font: font,
      color: textColor,
    });
  });
  
  yPosition -= 120;
  
  // ===== ATTENDEE INFORMATION SECTION =====
  page.drawText('ATTENDEE INFORMATION', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 25;
  
  // Attendee info box
  page.drawRectangle({
    x: 50,
    y: yPosition - 70,
    width: width - 100,
    height: 70,
    color: rgb(0.98, 0.98, 1),
    borderColor: primaryColor,
    borderWidth: 1,
  });
  
  const attendeeInfo = [
    { label: 'Full Name:', value: user?.name || 'Guest User' },
    { label: 'Email:', value: user?.email || 'N/A' },
    { label: 'Registration Date:', value: registration.registeredAt ? new Date(registration.registeredAt).toLocaleString() : 'N/A' },
    { label: 'Registration Type:', value: registration.isGuest ? 'Guest' : 'Member' }
  ];
  
  attendeeInfo.forEach((info, index) => {
    const infoY = yPosition - (index * 16);
    
    page.drawText(info.label, {
      x: 70,
      y: infoY,
      size: 9,
      font: boldFont,
      color: textColor,
    });
    
    page.drawText(info.value, {
      x: 150,
      y: infoY,
      size: 9,
      font: font,
      color: textColor,
    });
  });
  
  yPosition -= 90;
  
  // ===== FORM RESPONSES SECTION =====
  // Fix: Properly extract answers from registration
  let answers = {};
  
  if (registration.answers) {
    // Handle both Map and Object formats
    if (registration.answers instanceof Map) {
      answers = Object.fromEntries(registration.answers);
    } else if (typeof registration.answers === 'object') {
      answers = registration.answers;
    }
  }
  
  const answerEntries = Object.entries(answers);
  
  if (answerEntries.length > 0) {
    page.drawText('ADDITIONAL INFORMATION', {
      x: 50,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: primaryColor,
    });
    
    yPosition -= 25;
    
    // Answers box
    const answersHeight = Math.min(answerEntries.length * 25 + 20, 200);
    page.drawRectangle({
      x: 50,
      y: yPosition - answersHeight,
      width: width - 100,
      height: answersHeight,
      color: rgb(0.98, 0.98, 1),
      borderColor: primaryColor,
      borderWidth: 1,
    });
    
    answerEntries.forEach(([key, value], index) => {
      if (index < 8) { // Limit to 8 fields to prevent overflow
        const answerY = yPosition - (index * 25);
        
        page.drawText(`${key}:`, {
          x: 70,
          y: answerY,
          size: 9,
          font: boldFont,
          color: textColor,
        });
        
        // Handle long values by truncating
        const displayValue = String(value).length > 40 
          ? String(value).substring(0, 40) + '...' 
          : String(value);
          
        page.drawText(displayValue, {
          x: 200,
          y: answerY,
          size: 9,
          font: font,
          color: textColor,
        });
      }
    });
    
    yPosition -= (answersHeight + 30);
  }
  
  // ===== PAYMENT INFORMATION SECTION =====
  if (event.isPaid && event.price > 0) {
    page.drawText('PAYMENT DETAILS', {
      x: 50,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: primaryColor,
    });
    
    yPosition -= 25;
    
    // Payment box with accent color
    page.drawRectangle({
      x: 50,
      y: yPosition - 60,
      width: width - 100,
      height: 60,
      color: rgb(0.9, 0.95, 0.9),
      borderColor: accentColor,
      borderWidth: 2,
    });
    
    const paymentInfo = [
      { label: 'Amount Paid:', value: `ETB ${event.price.toFixed(2)}` },
      { label: 'Payment Status:', value: 'PAID' }, // Removed emoji
      { label: 'Payment Date:', value: registration.registeredAt ? new Date(registration.registeredAt).toLocaleDateString() : 'N/A' },
    ];
    
    paymentInfo.forEach((info, index) => {
      const paymentY = yPosition - (index * 18);
      
      page.drawText(info.label, {
        x: 70,
        y: paymentY,
        size: 10,
        font: boldFont,
        color: textColor,
      });
      
      // Use text styling instead of emoji for paid status
      let valueColor = textColor;
      if (index === 1) { // Payment Status line
        valueColor = accentColor;
      }
      
      page.drawText(info.value, {
        x: 150,
        y: paymentY,
        size: 10,
        font: index === 1 ? boldFont : font, // Make "PAID" bold
        color: valueColor,
      });
    });
    
    yPosition -= 80;
  } else {
    // Free event payment section
    page.drawText('PAYMENT INFORMATION', {
      x: 50,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: primaryColor,
    });
    
    yPosition -= 25;
    
    page.drawRectangle({
      x: 50,
      y: yPosition - 40,
      width: width - 100,
      height: 40,
      color: rgb(0.98, 0.98, 0.98),
      borderColor: lightTextColor,
      borderWidth: 1,
    });
    
    page.drawText('This is a free event. No payment required.', {
      x: 70,
      y: yPosition - 25,
      size: 10,
      font: font,
      color: textColor,
    });
    
    yPosition -= 60;
  }
  
  // ===== FOOTER SECTION =====
  const footerY = 60;
  
  page.drawLine({
    start: { x: 50, y: footerY + 30 },
    end: { x: width - 50, y: footerY + 30 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  
  page.drawText('This receipt confirms your successful registration for the event.', {
    x: 50,
    y: footerY + 15,
    size: 9,
    font: font,
    color: lightTextColor,
  });
  
  const contactInfo = [
    'EvaSUE - Evangelical Students Union of Ethiopia',
    'Email: support@evasue.net | Phone: +251 XXX XXX XXX',
    'Thank you for your registration! We look forward to seeing you at the event.'
  ];
  
  contactInfo.forEach((line, index) => {
    page.drawText(line, {
      x: 50,
      y: footerY - (index * 12),
      size: 8,
      font: font,
      color: lightTextColor,
    });
  });
  
  // Security watermark
  page.drawText(`Confidential - Generated for ${user?.name || user?.email || 'attendee'}`, {
    x: width - 300,
    y: 20,
    size: 7,
    font: font,
    color: rgb(0.9, 0.9, 0.9),
    opacity: 0.5,
  });
  
  // Return the PDF as a buffer
  return await pdfDoc.save();
}