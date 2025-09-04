import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';
import { events } from './events';
import { teams } from './teams';

// Conversations table
export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  type: text('type', { enum: ['direct', 'team', 'event', 'announcement'] }).notNull(),
  title: text('title'),
  createdBy: text('created_by').notNull().references(() => users.id),
  eventId: text('event_id').references(() => events.id, { onDelete: 'cascade' }),
  teamId: text('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Conversation participants
export const conversationParticipants = sqliteTable('conversation_participants', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  lastReadAt: integer('last_read_at', { mode: 'timestamp' }),
  role: text('role', { enum: ['member', 'admin', 'moderator'] }).default('member'),
});

// Messages table
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  messageType: text('message_type', { enum: ['text', 'file', 'image', 'announcement'] }).default('text'),
  attachments: text('attachments'), // JSON array of file URLs
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  editedAt: integer('edited_at', { mode: 'timestamp' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

// Notifications table
export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['message', 'event', 'team', 'job', 'sponsorship', 'system'] }).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  data: text('data'), // JSON object with additional data
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
});

// Type exports
export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
export type ConversationParticipant = typeof conversationParticipants.$inferSelect;
export type NewConversationParticipant = typeof conversationParticipants.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
