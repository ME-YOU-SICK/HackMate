import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Extract the file path from DATABASE_URL (remove 'file:' prefix if present)
const getDatabasePath = () => {
  const dbUrl = process.env.DATABASE_URL || './hackmate.db';
  if (dbUrl.startsWith('file:')) {
    return dbUrl.substring(5); // Remove 'file:' prefix
  }
  return dbUrl;
};

const sqlite = new Database(getDatabasePath());
export const db = drizzle(sqlite, { schema });

// Enable foreign keys
sqlite.pragma('foreign_keys = ON');

// Export the raw database instance for migrations
export { sqlite };
