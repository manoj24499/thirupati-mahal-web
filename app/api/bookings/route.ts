import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the shape of our booking data
export interface Booking {
  id: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  bookingDate: string;
  userBookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'bookings.json');

// Helper to read the JSON file
export async function getBookings(): Promise<Booking[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error: any) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper to write to the JSON file
export async function saveBookings(bookings: Booking[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(bookings, null, 2), 'utf8');
}

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ success: true, data: bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read bookings data.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newBooking: Booking = {
      id: crypto.randomUUID(), // Generate a unique ID
      userName: body.userName || '',
      email: body.email || '',
      phone: body.phone || '',
      address: body.address || '',
      bookingDate: body.bookingDate || '',
      userBookedDate: new Date().toISOString(),
      status: body.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const bookings = await getBookings();
    bookings.push(newBooking);
    
    await saveBookings(bookings);

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create booking.' }, { status: 500 });
  }
}
