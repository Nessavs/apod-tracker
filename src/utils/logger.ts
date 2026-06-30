import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  base: {
    service: 'apod-tracker',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});