import { z } from 'zod';
import { HttpRequest, HttpResponse } from '../types/Http';
import { created, badRequest } from '../utils/http';

const schema = z.object({
  goal: z.enum(['lose', 'maintain', 'gain']),
  gender: z.enum(['male', 'female']),
  birthDate: z.iso.date(),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
  }),
});

export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {

    const { success, error, data } = schema.safeParse(body)

    if (!success) {
      return badRequest({ errrors: error.issues });
    }

    return created({
      accessToken: 'signup: token de acesso',
    });
  }
}
