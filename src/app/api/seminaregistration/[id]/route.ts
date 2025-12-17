import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Registration from '@/models/Registration';
import Seminar from '@/models/Seminar';
import { Types } from 'mongoose';

interface Params {
  params: { id: string };
}

// GET single registration
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();
    
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid registration ID' },
        { status: 400 }
      );
    }
    
    const registration = await Registration.findById(params.id)
      .populate('seminarId', 'title date location instructor capacity')
      .lean();
    
    if (!registration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: registration });
  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
}

// PUT update registration (e.g., cancel registration)
export async function PUT(request: NextRequest, { params }: Params) {
  const session = await connectDB();
  
  try {
    await connectDB();
    
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid registration ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // If canceling registration, update seminar capacity
    if (body.status === 'cancelled') {
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        const registration = await Registration.findById(params.id).session(session);
        
        if (!registration) {
          await session.abortTransaction();
          return NextResponse.json(
            { success: false, error: 'Registration not found' },
            { status: 404 }
          );
        }
        
        // Only update if not already cancelled
        if (registration.status !== 'cancelled') {
          // Update seminar capacity
          await Seminar.findByIdAndUpdate(
            registration.seminarId,
            { 
              $inc: { currentRegistrations: -1 },
              isOpen: true, // Reopen if capacity allows
            },
            { session }
          );
        }
        
        // Update registration status
        const updatedRegistration = await Registration.findByIdAndUpdate(
          params.id,
          { 
            status: 'cancelled',
            notes: body.notes || `Cancelled on ${new Date().toISOString()}`,
          },
          { new: true, session }
        );
        
        await session.commitTransaction();
        
        return NextResponse.json({ 
          success: true, 
          data: updatedRegistration,
          message: 'Registration cancelled successfully' 
        });
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    }
    
    // For other updates
    const registration = await Registration.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!registration) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: registration });
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}