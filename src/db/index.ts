import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Check if we're in a serverless environment (like Netlify)
const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Extract the file path from DATABASE_URL (remove 'file:' prefix if present)
const getDatabasePath = () => {
  const dbUrl = process.env.DATABASE_URL || './hackmate.db';
  if (dbUrl.startsWith('file:')) {
    return dbUrl.substring(5); // Remove 'file:' prefix
  }
  return dbUrl;
};

// Create database instance with error handling for serverless environments
let sqlite: Database.Database;
let db: ReturnType<typeof drizzle>;

try {
  if (isServerless) {
    // In serverless environments, create an in-memory database
    sqlite = new Database(':memory:');
  } else {
    // In regular environments, use the file-based database
    sqlite = new Database(getDatabasePath());
  }
  
  db = drizzle(sqlite, { schema });
  
  // Enable foreign keys
  sqlite.pragma('foreign_keys = ON');
  
  // Initialize database with basic schema if it's in-memory
  if (isServerless) {
    // Create tables for in-memory database
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT NOT NULL,
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS userSessions (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expiresAt INTEGER NOT NULL,
        createdAt INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  }
} catch (error) {
  console.error('Database initialization error:', error);
  // Fallback to in-memory database
  sqlite = new Database(':memory:');
  db = drizzle(sqlite, { schema });
  sqlite.pragma('foreign_keys = ON');
}

export { db, sqlite };
