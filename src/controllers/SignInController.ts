import { compare } from 'bcryptjs';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { HttpRequest, HttpResponse } from '../types/Http';
import { ok, badRequest, unauthorized } from '../utils/http';
import { db } from '../db/';
import { usersTable } from '../db/schema';
import { signAccessTokenFor } from '../lib/jwt';

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

    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true
      },
      where: eq(usersTable.email, data.email)
    });

    if (!user) {
      return unauthorized({ error: 'Invalid Credentials' })
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      return unauthorized({ error: 'Invalid Credentials' })
    }

    const accessToken = await signAccessTokenFor(user.id);


    return ok({ accessToken });
  }
}
