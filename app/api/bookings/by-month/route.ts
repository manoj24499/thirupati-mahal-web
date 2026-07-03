import { NextResponse } from 'next/server';
import db from '@/lib/db';

/**
 * GET /api/bookings/by-month?year=YYYY&month=M
 *
 * Returns all bookings where bookingStartDate OR bookingEndDate
 * falls within the given year/month (month is 1-indexed: Jan=1, Dec=12).
 *
 * Response shape:
 * {
 *   success: true,
 *   data: Booking[],          // full booking rows
 *   bookedDates: string[]     // "YYYY-MM-DD" dates that are blocked
 * }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');

    if (!yearParam || !monthParam) {
      return NextResponse.json(
        { success: false, error: 'year and month query params are required.' },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10); // 1-indexed

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return NextResponse.json(
        { success: false, error: 'Invalid year or month.' },
        { status: 400 }
      );
    }

    // Build YYYY-MM prefix for the month, e.g. "2026-07"
    const monthStr = String(month).padStart(2, '0');
    const prefix = `${year}-${monthStr}`;

    // Query bookings where start OR end date is in this month
    const stmt = db.prepare(`
      SELECT * FROM bookings
      WHERE bookingStartDate LIKE ? OR bookingEndDate LIKE ?
      ORDER BY bookingStartDate ASC
    `);
    const bookings = stmt.all(`${prefix}%`, `${prefix}%`) as Array<{
      bookingStartDate: string;
      bookingEndDate: string;
      [key: string]: unknown;
    }>;

    // Expand each booking's date range into individual booked days
    // so the calendar can mark each day simply by checking a Set
    const bookedDatesSet = new Set<string>();

    for (const booking of bookings) {
      const start = new Date(booking.bookingStartDate);
      const end = new Date(booking.bookingEndDate);

      // Iterate day-by-day from start to end (inclusive)
      const cur = new Date(start);
      while (cur <= end) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, '0');
        const d = String(cur.getDate()).padStart(2, '0');
        bookedDatesSet.add(`${y}-${m}-${d}`);
        cur.setDate(cur.getDate() + 1);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: bookings,
        bookedDates: Array.from(bookedDatesSet).sort(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings by month:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings.' },
      { status: 500 }
    );
  }
}
