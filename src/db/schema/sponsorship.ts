import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';
import { events } from './events';

// Sponsorship requests table
export const sponsorshipRequests = sqliteTable('sponsorship_requests', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  organizerId: text('organizer_id').notNull().references(() => users.id),
  sponsorId: text('sponsor_id').references(() => users.id),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  requestedAmount: integer('requested_amount').notNull(),
  purpose: text('purpose').notNull(),
  benefits: text('benefits'), // JSON array of benefits
  status: text('status', { enum: ['pending', 'accepted', 'declined', 'negotiating'] }).default('pending'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  respondedAt: integer('responded_at', { mode: 'timestamp' }),
  notes: text('notes'),
});

// Sponsorships table (accepted requests)
export const sponsorships = sqliteTable('sponsorships', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  sponsorId: text('sponsor_id').notNull().references(() => users.id),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  terms: text('terms'), // JSON object with terms
  status: text('status', { enum: ['active', 'completed', 'cancelled'] }).default('active'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Sponsor analytics
export const sponsorAnalytics = sqliteTable('sponsor_analytics', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  sponsorId: text('sponsor_id').notNull().references(() => users.id),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  totalInvested: integer('total_invested').notNull(),
  roi: integer('roi'), // Return on investment percentage
  participantsReached: integer('participants_reached').default(0),
  leadsGenerated: integer('leads_generated').default(0),
  brandVisibility: integer('brand_visibility'), // 1-10 scale
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Type exports
export type SponsorshipRequest = typeof sponsorshipRequests.$inferSelect;
export type NewSponsorshipRequest = typeof sponsorshipRequests.$inferInsert;
export type Sponsorship = typeof sponsorships.$inferSelect;
export type NewSponsorship = typeof sponsorships.$inferInsert;
export type SponsorAnalytic = typeof sponsorAnalytics.$inferSelect;
export type NewSponsorAnalytic = typeof sponsorAnalytics.$inferInsert;
