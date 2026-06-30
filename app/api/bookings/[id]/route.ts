import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { Booking } from '@/utils/types';
import { getBookings, saveBookings } from '@/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const booking = stmt.get(id);

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read booking data.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const currentBooking = stmt.get(id) as Booking | undefined;

    if (!currentBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Update fields if provided in request body
    const updatedBooking: Booking = {
      ...currentBooking,
      ...body,
      id: currentBooking.id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    };

    // Update SQLite
    const updateStmt = db.prepare(`
      UPDATE bookings 
      SET userName = @userName, email = @email, phone = @phone, address = @address, 
          bookingDate = @bookingDate, userBookedDate = @userBookedDate, status = @status, 
          createdAt = @createdAt, updatedAt = @updatedAt
      WHERE id = @id
    `);
    updateStmt.run(updatedBooking);

    // Update JSON
    const bookings = await getBookings();
    const index = bookings.findIndex((b: Booking) => b.id === id);
    if (index !== -1) {
      bookings[index] = updatedBooking;
    } else {
      bookings.push(updatedBooking); // Fallback in case it wasn't in JSON
    }
    await saveBookings(bookings);

    return NextResponse.json({ success: true, data: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to update booking.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?');
    const existing = stmt.get(id);

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Delete from SQLite
    const deleteStmt = db.prepare('DELETE FROM bookings WHERE id = ?');
    deleteStmt.run(id);

    // Delete from JSON
    const bookings = await getBookings();
    const index = bookings.findIndex((b: Booking) => b.id === id);
    if (index !== -1) {
      bookings.splice(index, 1);
      await saveBookings(bookings);
    }

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete booking.' }, { status: 500 });
  }
}
