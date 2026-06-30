import { z } from 'zod';

/**
 * Validamos as env vars no boot da Lambda usando Zod.
 * Se faltar algo, a Lambda quebra imediatamente no cold start
 * com erro claro — em vez de quebrar depois durante uma requisição.
 */
const envSchema = z.object({
  NASA_API_KEY: z.string().min(1, 'NASA_API_KEY is required'),
  NASA_API_URL: z.string().url('NASA_API_URL must be a valid URL'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;