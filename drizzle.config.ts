import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/drizzle/schema.ts',
  out: './server/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
});
