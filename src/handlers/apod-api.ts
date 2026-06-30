import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ZodError } from 'zod';
import { fetchApod } from '@/services/nasa.service';
import { dateParamSchema } from '@/schemas/apod.schema';
import { logger } from '@/utils/logger';

function response(statusCode: number, body: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const requestLogger = logger.child({ path: event.path, method: event.httpMethod });

  try {
    let date: string | undefined;

    if (event.pathParameters?.date) {
      const parsed = dateParamSchema.parse(event.pathParameters);
      date = parsed.date;
    }

    const photo = await fetchApod(date);

    requestLogger.info({ date: date ?? 'today' }, 'Request completed');

    return response(200, photo);
  } catch (error) {
    if (error instanceof ZodError) {
      requestLogger.warn({ issues: error.issues }, 'Validation failed');
      return response(400, { message: 'Validation failed', issues: error.issues });
    }

    requestLogger.error({ err: error }, 'Unexpected error');
    return response(500, { message: 'Internal server error' });
  }
};