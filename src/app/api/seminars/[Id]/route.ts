import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Seminar from '@/models/Seminar';
import Registration from '@/models/SeminarRegistration';
import { Types } from 'mongoose';

// GET single seminar with registration count
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid seminar ID' },
        { status: 400 }
      );
    }

    const seminar = await Seminar.findById(id).lean();

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: 'Seminar not found' },
        { status: 404 }
      );
    }

    const registrationCount = await Registration.countDocuments({
      seminarId: id,
      status: { $ne: 'cancelled' },
    });

    const capacity = seminar.capacity as number;

    return NextResponse.json({
      success: true,
      data: {
        ...seminar,
        currentRegistrations: registrationCount,
        isFull: registrationCount >= capacity,
        availableSeats: capacity - registrationCount,
      },
    });
  } catch (error) {
    console.error('Error fetching seminar:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seminar' },
      { status: 500 }
    );
  }
}

// PUT update seminar
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid seminar ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const seminar = await Seminar.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: 'Seminar not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: seminar });
  } catch (error) {
    console.error('Error updating seminar:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update seminar' },
      { status: 500 }
    );
  }
}

// DELETE seminar
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid seminar ID' },
        { status: 400 }
      );
    }

    const registrationsCount = await Registration.countDocuments({
      seminarId: id,
      status: { $ne: 'cancelled' },
    });

    if (registrationsCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete seminar with active registrations',
        },
        { status: 400 }
      );
    }

    const seminar = await Seminar.findByIdAndDelete(id);

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: 'Seminar not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Seminar deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting seminar:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete seminar' },
      { status: 500 }
    );
  }
}
