import { NextRequest, NextResponse } from 'next/server';
import { connectDB} from '@/lib/db';
import Seminar from '@/models/Seminar';
import { Types } from 'mongoose';

// GET all seminars with availability info
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const isOpen = searchParams.get('isOpen');
    const upcoming = searchParams.get('upcoming');
    
    // eslint-disable-next-line prefer-const
    let query: any = {};
    
    if (isOpen === 'true') {
      query.isOpen = true;
    }
    
    const seminars = await Seminar.find(query)
      .sort({ date: 1 })
      .lean();
    
    // Add virtual fields manually
    const seminarsWithAvailability = seminars.map(seminar => ({
      ...seminar,
      isFull: seminar.currentRegistrations >= seminar.capacity,
      availableSeats: seminar.capacity - seminar.currentRegistrations,
    }));
    
    return NextResponse.json({ 
      success: true, 
      count: seminars.length,
      data: seminarsWithAvailability 
    });
  } catch (error) {
    console.error('Error fetching seminars:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seminars' },
      { status: 500 }
    );
  }
}

// POST create new seminar
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'date', 'capacity', 'location', 'instructor'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    const seminar = await Seminar.create({
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      capacity: parseInt(body.capacity),
      location: body.location,
      instructor: body.instructor,
      currentRegistrations: 0,
      isOpen: true,
    });
    
    return NextResponse.json(
      { success: true, data: seminar },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating seminar:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create seminar' },
      { status: 500 }
    );
  }
}