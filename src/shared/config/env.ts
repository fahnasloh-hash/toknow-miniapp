import { z } from 'zod';

/**
 * Env schema — public vars are inlined by Next at build time.
 * Server-only secrets (BOT_TOKEN, JWT_SECRET, …) go through `serverEnvSchema`
 * and must only be read from inside route handlers / server actions.
 */

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('https://api.example.com'),
  NEXT_PUBLIC_TG_BOT_NAME: z.string().default('ToKnowBot'),
  NEXT_PUBLIC_TG_CHANNEL: z.string().default('@toknow'),
  NEXT_PUBLIC_ANALYTICS_KEY: z.string().optional(),
});

const serverEnvSchema = z.object({
  BOT_TOKEN: z.string().optional(),
  JWT_SECRET: z.string().optional(),
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_TG_BOT_NAME: process.env.NEXT_PUBLIC_TG_BOT_NAME,
  NEXT_PUBLIC_TG_CHANNEL: process.env.NEXT_PUBLIC_TG_CHANNEL,
  NEXT_PUBLIC_ANALYTICS_KEY: process.env.NEXT_PUBLIC_ANALYTICS_KEY,
});

export const serverEnv = () =>
  serverEnvSchema.parse({
    BOT_TOKEN: process.env.BOT_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
  });
