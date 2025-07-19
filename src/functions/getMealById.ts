import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { GetMealByIdController } from '../controllers/GetMealByIdController';
import { parseProtectedEvent } from '../utils/parseProtectedEvent';
import { unauthorized } from '../utils/http';
import { parseResponse } from '../utils/parseResponse';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event);
    const response = await GetMealByIdController.handle(request);
    return parseResponse(response);
  } catch {
    return unauthorized({ error: 'Invalid access token' });
  }
}
