import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';

// Skills table
export const skills = sqliteTable('skills', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull().unique(),
  category: text('category').notNull(),
  description: text('description'),
  icon: text('icon'), // Icon name or URL
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Skill categories
export const skillCategories = sqliteTable('skill_categories', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull().unique(),
  description: text('description'),
  parentCategoryId: text('parent_category_id').references(() => skillCategories.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// User skills (many-to-many relationship)
export const userSkills = sqliteTable('user_skills', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  skillId: text('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  proficiencyLevel: integer('proficiency_level').notNull(), // 1-100 scale
  yearsExperience: integer('years_experience').default(0),
  lastUsed: integer('last_used', { mode: 'timestamp' }),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Learning paths
export const learningPaths = sqliteTable('learning_paths', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  title: text('title').notNull(),
  description: text('description'),
  skills: text('skills'), // JSON array of skill IDs
  estimatedTime: text('estimated_time'), // e.g., "3 months"
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).default('beginner'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// User learning progress
export const userLearningProgress = sqliteTable('user_learning_progress', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  learningPathId: text('learning_path_id').notNull().references(() => learningPaths.id, { onDelete: 'cascade' }),
  progress: integer('progress').default(0), // 0-100 percentage
  startedAt: integer('started_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  status: text('status', { enum: ['not_started', 'in_progress', 'completed', 'paused'] }).default('not_started'),
});

// Type exports
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type SkillCategory = typeof skillCategories.$inferSelect;
export type NewSkillCategory = typeof skillCategories.$inferInsert;
export type UserSkill = typeof userSkills.$inferSelect;
export type NewUserSkill = typeof userSkills.$inferInsert;
export type LearningPath = typeof learningPaths.$inferSelect;
export type NewLearningPath = typeof learningPaths.$inferInsert;
export type UserLearningProgress = typeof userLearningProgress.$inferSelect;
export type NewUserLearningProgress = typeof userLearningProgress.$inferInsert;
