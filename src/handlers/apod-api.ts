import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'APOD API funcionando!',
      method: event.httpMethod,
      path: event.path,
    }),
  };

  return response;
};