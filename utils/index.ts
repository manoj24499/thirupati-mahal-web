import fs from 'fs/promises';
import path from 'path';
import { Booking } from './types';

const dataFilePath = path.join(process.cwd(), 'db', 'bookings.json');

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
