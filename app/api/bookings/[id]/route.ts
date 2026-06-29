import { NextResponse } from 'next/server';
import { getBookings, saveBookings, Booking } from '../route';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookings = await getBookings();
    const booking = bookings.find((b: Booking) => b.id === id);

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
    const bookings = await getBookings();
    
    const index = bookings.findIndex((b: Booking) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Update fields if provided in request body
    const currentBooking = bookings[index];
    const updatedBooking: Booking = {
      ...currentBooking,
      ...body,
      id: currentBooking.id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    };

    bookings[index] = updatedBooking;
    await saveBookings(bookings);

    return NextResponse.json({ success: true, data: updatedBooking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update booking.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookings = await getBookings();
    
    const index = bookings.findIndex((b: Booking) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Remove the item from array
    bookings.splice(index, 1);
    await saveBookings(bookings);

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete booking.' }, { status: 500 });
  }
}
