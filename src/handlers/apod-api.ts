import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ZodError } from 'zod';
import { dateParamSchema } from '@/schemas/apod.schema';

/**
 * Helper pra padronizar respostas HTTP.
 */
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

/**
 * GET /apod          -> foto de hoje
 * GET /apod/{date}   -> foto de uma data específica (YYYY-MM-DD)
 */
export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    let date: string | undefined;

    // Se veio um path param, valida com Zod
    if (event.pathParameters?.date) {
      const parsed = dateParamSchema.parse(event.pathParameters);
      date = parsed.date;
    }

    return response(200, {
      message: 'APOD API funcionando!',
      date: date ?? 'hoje',
      path: event.path,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response(400, {
        message: 'Validation failed',
        issues: error.issues,
      });
    }

    return response(500, { message: 'Internal server error' });
  }
};