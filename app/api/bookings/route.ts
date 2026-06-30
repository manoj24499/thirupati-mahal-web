import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Booking } from '@/utils/types';
import { getBookings, saveBookings } from '@/utils';
export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC');
    const bookings = stmt.all();
    return NextResponse.json({ success: true, data: bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings from DB:', error);
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

    // Save to database
    const insert = db.prepare(`
      INSERT INTO bookings (id, userName, email, phone, address, bookingDate, userBookedDate, status, createdAt, updatedAt)
      VALUES (@id, @userName, @email, @phone, @address, @bookingDate, @userBookedDate, @status, @createdAt, @updatedAt)
    `);
    insert.run(newBooking);

    // Save to JSON
    const bookings = await getBookings();
    bookings.push(newBooking);
    
    await saveBookings(bookings);

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to create booking.' }, { status: 500 });
  }
}
