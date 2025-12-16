// app/api/test-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Registration from '@/models/Registration';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Find a real registration to test with
    const realRegistration = await Registration.findOne().sort({ createdAt: -1 });
    
    if (!realRegistration) {
      return NextResponse.json({
        error: 'No registrations found for testing',
        suggestion: 'Create a registration first'
      });
    }

    const testPayload = {
      tx_ref: `${realRegistration._id}-${Date.now()}`,
      status: 'success',
      amount: realRegistration.amountPaid || 100,
      currency: 'ETB',
      customer: {
        email: realRegistration.email || 'test@example.com',
        name: 'Test Customer'
      },
      meta: {
        test: true,
        timestamp: new Date().toISOString()
      }
    };

    // Send to your webhook
    const webhookResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/registrations/payment-callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-chapa-signature': 'test-signature' // Optional for testing
      },
      body: JSON.stringify(testPayload)
    });

    const result = await webhookResponse.json();

    return NextResponse.json({
      message: 'Test webhook sent',
      registrationId: realRegistration._id,
      payload: testPayload,
      webhookResponse: result
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}