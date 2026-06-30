import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '@/utils/logger';
import { env } from '@/config/env';
import { ApodPhoto, nasaApodResponseSchema } from '@/schemas/apod.schema';

const nasaClient: AxiosInstance = axios.create({
  baseURL: env.NASA_API_URL,
  timeout: 10000,
  params: { api_key: env.NASA_API_KEY },
});

axiosRetry(nasaClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    (error.response?.status ?? 0) >= 500,
  onRetry: (retryCount, error) => {
    logger.warn({ retryCount, err: error.message }, 'Retrying NASA API request');
  },
});

export async function fetchApod(date?: string): Promise<ApodPhoto> {
  const params = date ? { date } : {};

  logger.info({ date: date ?? 'today' }, 'Fetching APOD from NASA');

  const { data } = await nasaClient.get<unknown>('', { params });

  const photo = nasaApodResponseSchema.parse(data);

  logger.info({ title: photo.title, mediaType: photo.mediaType }, 'APOD fetched successfully');

  return photo;
}