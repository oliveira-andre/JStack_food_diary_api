import { compare } from 'bcryptjs';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { ProtectedHttpRequest, HttpResponse } from '../types/Http';
import { ok, badRequest, unauthorized } from '../utils/http';
import { db } from '../db/';
import { usersTable } from '../db/schema';
import { signAccessTokenFor } from '../lib/jwt';

export class MeController {
  static async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        name: true,
        calories: true,
        proteins: true,
        carbohydrates: true,
        fats: true,
      },
      where: eq(usersTable.id, userId)
    });

    return ok({ user, userId });
  }
}
