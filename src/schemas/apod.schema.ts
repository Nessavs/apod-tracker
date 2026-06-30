import { z } from 'zod';

export const nasaApodResponseSchema = z
  .object({
    date: z.string(),
    title: z.string(),
    explanation: z.string(),
    media_type: z.enum(['image', 'video']),
    url: z.url(),
    hdurl: z.url().optional(),
    copyright: z.string().optional(),
    thumbnail_url: z.url().optional(),
  })
  .transform((data) => ({
    date: data.date,
    title: data.title,
    explanation: data.explanation,
    mediaType: data.media_type,
    url: data.url,
    hdUrl: data.hdurl,
    copyright: data.copyright,
    thumbnailUrl: data.thumbnail_url,
  }));

export type NasaApodResponse = z.input<typeof nasaApodResponseSchema>;
export type ApodPhoto = z.output<typeof nasaApodResponseSchema>;

export const dateParamSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
});

export type DateParam = z.infer<typeof dateParamSchema>;