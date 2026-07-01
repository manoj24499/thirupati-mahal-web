import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'bookings.db');
const db = new Database(dbPath);

// Initialize the database table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    userName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    bookingStartDate TEXT NOT NULL,
    bookingEndDate TEXT NOT NULL,
    userBookedDate TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`);

export default db;
