import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { db } from '@/db';
import { users, userSessions } from '@/db/schema/auth';
import { eq, and, gt } from 'drizzle-orm';
import type { User, NewUser, UserSession, NewUserSession } from '@/db/schema/auth';

// Create a new user
export async function createUser(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'organizer' | 'recruiter' | 'sponsor';
}): Promise<User> {
  const passwordHash = await bcrypt.hash(userData.password, 12);
  
  const [user] = await db.insert(users).values({
    id: nanoid(),
    email: userData.email,
    passwordHash,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    isVerified: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  
  return user;
}

// Verify user credentials
export async function verifyUser(email: string, password: string): Promise<User | null> {
  const [user] = await db.select().from(users)
    .where(and(eq(users.email, email), eq(users.isActive, true)));
  
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;
  
  return user;
}

// Create a new session
export async function createSession(userId: string): Promise<{ token: string; session: UserSession }> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
  const tokenHash = await bcrypt.hash(token, 12);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const [session] = await db.insert(userSessions).values({
    id: nanoid(),
    userId,
    tokenHash,
    expiresAt,
    createdAt: new Date(),
  }).returning();
  
  return { token, session };
}

// Verify session token
export async function verifySession(token: string): Promise<User | null> {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
    
    const [session] = await db.select()
      .from(userSessions)
      .where(and(
        eq(userSessions.userId, payload.userId),
        gt(userSessions.expiresAt, new Date())
      ));
    
    if (!session) return null;
    
    const [user] = await db.select().from(users)
      .where(and(eq(users.id, payload.userId), eq(users.isActive, true)));
    
    return user || null;
  } catch {
    return null;
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  const [user] = await db.select().from(users)
    .where(and(eq(users.id, userId), eq(users.isActive, true)));
  
  return user || null;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db.select().from(users)
    .where(and(eq(users.email, email), eq(users.isActive, true)));
  
  return user || null;
}

// Update user
export async function updateUser(userId: string, updates: Partial<NewUser>): Promise<User | null> {
  const [user] = await db.update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  
  return user || null;
}

// Delete session (logout)
export async function deleteSession(token: string): Promise<boolean> {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
    
    const result = await db.delete(userSessions)
      .where(eq(userSessions.userId, payload.userId));
    
    return result.changes > 0;
  } catch {
    return false;
  }
}

// Delete all sessions for a user
export async function deleteAllUserSessions(userId: string): Promise<boolean> {
  const result = await db.delete(userSessions)
    .where(eq(userSessions.userId, userId));
  
  return result.changes > 0;
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<number> {
  const result = await db.delete(userSessions)
    .where(gt(new Date(), userSessions.expiresAt));
  
  return result.changes;
}

// Check if email exists
export async function emailExists(email: string): Promise<boolean> {
  const [user] = await db.select({ id: users.id }).from(users)
    .where(eq(users.email, email));
  
  return !!user;
}

// Verify user email
export async function verifyUserEmail(userId: string): Promise<User | null> {
  const [user] = await db.update(users)
    .set({ isVerified: true, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  
  return user || null;
}

// Deactivate user account
export async function deactivateUser(userId: string): Promise<User | null> {
  const [user] = await db.update(users)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  
  // Also delete all sessions
  await deleteAllUserSessions(userId);
  
  return user || null;
}
