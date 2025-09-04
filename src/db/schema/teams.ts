import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';
import { eventPanels } from './events';

// Teams table
export const teams = sqliteTable('teams', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  panelId: text('panel_id').notNull().references(() => eventPanels.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  maxMembers: integer('max_members').default(4),
  currentMembers: integer('current_members').default(0),
  status: text('status', { enum: ['forming', 'active', 'completed', 'disqualified'] }).default('forming'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Team members
export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  teamId: text('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  status: text('status', { enum: ['active', 'left', 'removed'] }).default('active'),
});

// Team submissions
export const teamSubmissions = sqliteTable('team_submissions', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  teamId: text('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  githubRepo: text('github_repo'),
  demoUrl: text('demo_url'),
  presentationUrl: text('presentation_url'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  status: text('status', { enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'] }).default('draft'),
});

// Type exports
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type TeamSubmission = typeof teamSubmissions.$inferSelect;
export type NewTeamSubmission = typeof teamSubmissions.$inferInsert;
