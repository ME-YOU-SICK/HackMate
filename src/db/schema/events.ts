import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';

// Events table
export const events = sqliteTable('events', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  organizerId: text('organizer_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
  location: text('location').notNull(),
  type: text('type').notNull(),
  maxParticipants: integer('max_participants').notNull(),
  currentParticipants: integer('current_participants').default(0),
  status: text('status', { enum: ['upcoming', 'active', 'completed', 'cancelled'] }).default('upcoming'),
  prizePool: integer('prize_pool').default(0),
  registrationDeadline: integer('registration_deadline', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Event panels
export const eventPanels = sqliteTable('event_panels', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  location: text('location'),
  maxTeams: integer('max_teams').default(10),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Event participants
export const eventParticipants = sqliteTable('event_participants', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  status: text('status', { enum: ['registered', 'active', 'completed', 'disqualified'] }).default('registered'),
});

// Type exports
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventPanel = typeof eventPanels.$inferSelect;
export type NewEventPanel = typeof eventPanels.$inferInsert;
export type EventParticipant = typeof eventParticipants.$inferSelect;
export type NewEventParticipant = typeof eventParticipants.$inferInsert;
