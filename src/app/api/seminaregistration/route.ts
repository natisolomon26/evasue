import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Types } from 'mongoose';
import SeminarRegistration from '@/models/SeminarRegistration';
import Seminar from '@/models/Seminar';


export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = request.nextUrl;

    const seminarId = searchParams.get('seminarId');
    const status = searchParams.get('status');
    const phoneNumber = searchParams.get('phoneNumber');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (seminarId) {
      if (!Types.ObjectId.isValid(seminarId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid seminarId' },
          { status: 400 }
        );
      }
      query.seminarId = seminarId;
    }

    if (status) {
      query.status = status;
    }

    if (phoneNumber) {
      query.phoneNumber = phoneNumber;
    }

    const registrations = await SeminarRegistration.find(query)
      .populate('seminarId', 'title date location')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });

  } catch (error) {
    console.error('Error fetching seminar registrations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const { seminarId, fullName, phoneNumber, email } = body;

    if (!seminarId || !fullName || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'seminarId, fullName, phoneNumber are required' },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(seminarId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid seminar ID' },
        { status: 400 }
      );
    }

    const seminar = await Seminar.findById(seminarId);
    if (!seminar) {
      return NextResponse.json(
        { success: false, error: 'Seminar not found' },
        { status: 404 }
      );
    }

    if (!seminar.isOpen) {
      return NextResponse.json(
        { success: false, error: 'Registration closed' },
        { status: 400 }
      );
    }

    const existing = await SeminarRegistration.findOne({
      seminarId,
      phoneNumber,
      status: 'confirmed',
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Already registered' },
        { status: 400 }
      );
    }

    const registration = new SeminarRegistration({
      seminarId,
      fullName,
      phoneNumber,
      email,
    });

    await registration.save();

    await Seminar.findByIdAndUpdate(seminarId, {
      $inc: { currentRegistrations: 1 },
      isOpen: seminar.currentRegistrations + 1 < seminar.capacity,
    });

    return NextResponse.json(
      { success: true, data: registration },
      { status: 201 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating registration:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}
