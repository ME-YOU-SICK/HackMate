import { eq, and } from 'drizzle-orm';
import { users, userSessions } from '@/db/schema/auth';

// Row Level Security Policies for Auth Tables

// User can only access their own data
export const userOwnsData = (userId: string) => eq(users.id, userId);

// Session belongs to user
export const sessionBelongsToUser = (userId: string) => eq(userSessions.userId, userId);

// Active users only
export const activeUsersOnly = eq(users.isActive, true);

// Verified users only (for certain operations)
export const verifiedUsersOnly = eq(users.isVerified, true);

// Role-based access
export const roleBasedAccess = (role: string) => eq(users.role, role);

// Combined policies for common use cases
export const activeUserOwnsData = (userId: string) => and(
  userOwnsData(userId),
  activeUsersOnly
);

export const verifiedUserOwnsData = (userId: string) => and(
  userOwnsData(userId),
  activeUsersOnly,
  verifiedUsersOnly
);

export const roleBasedUserAccess = (userId: string, role: string) => and(
  userOwnsData(userId),
  activeUsersOnly,
  roleBasedAccess(role)
);

// Session validation policies
export const validSessionForUser = (userId: string) => and(
  sessionBelongsToUser(userId),
  eq(userSessions.expiresAt, new Date()) // This would need to be adjusted for actual timestamp comparison
);
