import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';

// Job postings table
export const jobPostings = sqliteTable('job_postings', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  recruiterId: text('recruiter_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  type: text('type', { enum: ['full-time', 'part-time', 'contract', 'internship'] }).notNull(),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  description: text('description').notNull(),
  requirements: text('requirements'), // JSON array
  benefits: text('benefits'), // JSON array
  status: text('status', { enum: ['draft', 'active', 'paused', 'closed'] }).default('draft'),
  postedAt: integer('posted_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Job applications table
export const jobApplications = sqliteTable('job_applications', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  jobId: text('job_id').notNull().references(() => jobPostings.id, { onDelete: 'cascade' }),
  candidateId: text('candidate_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['applied', 'reviewing', 'interviewing', 'accepted', 'rejected'] }).default('applied'),
  appliedAt: integer('applied_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  coverLetter: text('cover_letter'),
  resumeUrl: text('resume_url'),
  notes: text('notes'),
});

// Interviews table
export const interviews = sqliteTable('interviews', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  applicationId: text('application_id').notNull().references(() => jobApplications.id, { onDelete: 'cascade' }),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }).notNull(),
  duration: integer('duration').default(60), // minutes
  type: text('type', { enum: ['phone', 'video', 'in-person', 'technical'] }).notNull(),
  status: text('status', { enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'] }).default('scheduled'),
  notes: text('notes'),
  feedback: text('feedback'),
  rating: integer('rating'), // 1-5 scale
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Recruiter connections
export const recruiterConnections = sqliteTable('recruiter_connections', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  recruiterId: text('recruiter_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  candidateId: text('candidate_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['connected', 'interested', 'not_interested'] }).default('connected'),
  connectedAt: integer('connected_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  notes: text('notes'),
});

// Type exports
export type JobPosting = typeof jobPostings.$inferSelect;
export type NewJobPosting = typeof jobPostings.$inferInsert;
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;
export type Interview = typeof interviews.$inferSelect;
export type NewInterview = typeof interviews.$inferInsert;
export type RecruiterConnection = typeof recruiterConnections.$inferSelect;
export type NewRecruiterConnection = typeof recruiterConnections.$inferInsert;
