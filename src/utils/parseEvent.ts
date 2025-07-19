import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { HttpRequest } from '../types/Http';

export function parseEvent(event: APIGatewayProxyEventV2): HttpRequest {
  const body = JSON.parse(event.body ?? '{}');
  const params = event.pathParameters ?? {};
  const queryParams = event.queryStringParameters ?? {};

  return {
    body,
    params,
    queryParams,
  };
}
