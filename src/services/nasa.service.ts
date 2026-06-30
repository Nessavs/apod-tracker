import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { env } from '@/config/env';
import {
  ApodPhoto,
  NasaApodResponse,
  nasaApodResponseSchema,
} from '@/schemas/apod.schema';

/**
 * Cliente HTTP da NASA com retry automático.
 * - 3 tentativas
 * - backoff exponencial (1s, 2s, 4s)
 * - retry em erros de rede e 5xx
 */
const nasaClient: AxiosInstance = axios.create({
  baseURL: env.NASA_API_URL,
  timeout: 10000,
  params: { api_key: env.NASA_API_KEY },
});

axiosRetry(nasaClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ?? 0) >= 500
    );
  },
});

/**
 * Converte resposta crua da NASA para o nosso modelo de domínio.
 * Aqui o snake_case vira camelCase e ignoramos campos irrelevantes.
 */
function toApodPhoto(raw: NasaApodResponse): ApodPhoto {
  return {
    date: raw.date,
    title: raw.title,
    explanation: raw.explanation,
    mediaType: raw.media_type,
    url: raw.url,
    hdUrl: raw.hdurl,
    copyright: raw.copyright,
    thumbnailUrl: raw.thumbnail_url,
  };
}

/**
 * Busca a foto do dia (hoje) ou de uma data específica.
 */
export async function fetchApod(date?: string): Promise<ApodPhoto> {
  const params = date ? { date } : {};

  const { data } = await nasaClient.get<unknown>('', { params });

  // Validação runtime: garante que a NASA não mudou o contrato sem avisar
  const parsed = nasaApodResponseSchema.parse(data);

  return toApodPhoto(parsed);
}