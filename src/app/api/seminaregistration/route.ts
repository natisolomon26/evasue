import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Registration from '@/models/Registration';
import Seminar from '@/models/Seminar';
import { Types } from 'mongoose';

// GET all registrations with seminar details
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const seminarId = searchParams.get('seminarId');
    const status = searchParams.get('status');
    
    // eslint-disable-next-line prefer-const
    let query: any = {};
    
    if (seminarId) {
      if (!Types.ObjectId.isValid(seminarId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid seminar ID' },
          { status: 400 }
        );
      }
      query.seminarId = seminarId;
    }
    
    if (status) {
      query.status = status;
    }
    
    const registrations = await Registration.find(query)
      .populate('seminarId', 'title date location instructor')
      .sort({ registrationDate: -1 })
      .lean();
    
    return NextResponse.json({ 
      success: true, 
      count: registrations.length,
      data: registrations 
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// POST create new registration
export async function POST(request: NextRequest) {
  const session = await connectDB();
  let transactionSuccess = false;
  
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['seminarId', 'fullName', 'phoneNumber'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    if (!Types.ObjectId.isValid(body.seminarId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid seminar ID' },
        { status: 400 }
      );
    }
    
    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Check if seminar exists and is open
      const seminar = await Seminar.findById(body.seminarId).session(session);
      
      if (!seminar) {
        await session.abortTransaction();
        return NextResponse.json(
          { success: false, error: 'Seminar not found' },
          { status: 404 }
        );
      }
      
      if (!seminar.isOpen) {
        await session.abortTransaction();
        return NextResponse.json(
          { 
            success: false, 
            error: 'Seminar registration is closed',
            isFull: seminar.currentRegistrations >= seminar.capacity
          },
          { status: 400 }
        );
      }
      
      // Check for duplicate registration
      const existingRegistration = await Registration.findOne({
        seminarId: body.seminarId,
        phoneNumber: body.phoneNumber,
        status: { $ne: 'cancelled' },
      }).session(session);
      
      if (existingRegistration) {
        await session.abortTransaction();
        return NextResponse.json(
          { success: false, error: 'Already registered for this seminar' },
          { status: 400 }
        );
      }
      
      // Check capacity
      const registrationCount = await Registration.countDocuments({
        seminarId: body.seminarId,
        status: { $ne: 'cancelled' },
      }).session(session);
      
      if (registrationCount >= seminar.capacity) {
        // Update seminar to closed
        await Seminar.findByIdAndUpdate(
          body.seminarId,
          { isOpen: false },
          { session }
        );
        
        await session.abortTransaction();
        return NextResponse.json(
          { 
            success: false, 
            error: 'Seminar is full',
            isFull: true 
          },
          { status: 400 }
        );
      }
      
      // Create registration
      const registration = await Registration.create([{
        seminarId: body.seminarId,
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        notes: body.notes,
        status: 'confirmed',
      }], { session });
      
      // Update seminar registration count
      await Seminar.findByIdAndUpdate(
        body.seminarId,
        { 
          $inc: { currentRegistrations: 1 },
          isOpen: registrationCount + 1 < seminar.capacity,
        },
        { session }
      );
      
      await session.commitTransaction();
      transactionSuccess = true;
      
      return NextResponse.json(
        { success: true, data: registration[0] },
        { status: 201 }
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating registration:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Already registered for this seminar' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}