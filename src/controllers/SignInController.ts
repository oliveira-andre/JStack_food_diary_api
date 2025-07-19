import { z } from 'zod';
import { HttpRequest, HttpResponse } from '../types/Http';
import { ok, badRequest } from '../utils/http';

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export class SignInController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({ errrors: error.issues });
    }

    return ok({ accessToken: 'token de acesso' });
  }
}
