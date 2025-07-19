import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { HttpRequest } from '../types/Http';
import { validateAccessToken } from '../lib/jwt';
import { parseEvent } from './parseEvent';

export function parseProtectedEvent(event: APIGatewayProxyEventV2): HttpRequest {
  const baseEvent = parseEvent(event);
  const { authorization } = event.headers;


  if (!authorization) {
    throw new Error('Invalid credentials');
  }

  const [, token] = authorization.split(' ');
  const userId = validateAccessToken(token);

  if (!userId) {
    throw new Error('Access token');
  }

  return {
    ...baseEvent,
    userId
  };
}
