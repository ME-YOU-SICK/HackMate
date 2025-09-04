import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || './hackmate.db',
  },
  verbose: true,
  strict: true,
} satisfies Config;
