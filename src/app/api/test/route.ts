import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API Route is working correctly!',
    timestamp: new Date().toISOString(),
    route: '/api/test',
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    message: 'POST request received',
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
}