import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { db } from '../db';
import { mealsTable } from '../db/schema';
import { HttpResponse, ProtectedHttpRequest } from '../types/Http';
import { badRequest, ok } from '../utils/http';

const schema = z.object({
  mealId: z.uuid(),
});

export class GetMealByIdController {
  static async handle({ userId, params }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(params);
    
    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const meal = await db.query.mealsTable.findFirst({
      columns: {
        id: true,
        foods: true,
        createdAt: true,
        icon: true,
        name: true,
        status: true,
      },
      where: and(
        eq(mealsTable.id, data.mealId),
        eq(mealsTable.userId, userId),
      ),
    });

    return ok({ meal });
  }
}
