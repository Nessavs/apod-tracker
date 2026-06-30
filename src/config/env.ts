import { z } from 'zod';

// Fails fast on cold start if any required env var is missing or invalid.
const envSchema = z.object({
  NASA_API_KEY: z.string().min(1, 'NASA_API_KEY is required'),
  NASA_API_URL: z.url('NASA_API_URL must be a valid URL'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;