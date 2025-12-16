// app/api/webhook-test/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headers = Object.fromEntries(req.headers);
    
    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Headers:', headers);
    console.log('Body:', body);
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================');
    
    // Always return 200 OK to Chapa
    return NextResponse.json({ 
      received: true, 
      timestamp: new Date().toISOString() 
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook test endpoint is running',
    timestamp: new Date().toISOString(),
    instructions: 'Configure this URL in Chapa dashboard as webhook endpoint'
  });
}