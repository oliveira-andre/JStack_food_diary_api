import z from 'zod';
import { db } from '../db';
import { mealsTable } from '../db/schema';
import { HttpResponse, ProtectedHttpRequest } from '../types/Http';
import { badRequest, created } from '../utils/http';

const schema = z.object({
  fileType: z.enum(['audio/m4a', 'image/jpeg']),
});

export class CreateMealController {
  static async handle({ userId, body }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);
    
    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const [meal] = await db
      .insert(mealsTable)
      .values({
        userId,
        inputFileKey: 'input_file_key',
        inputType: data.fileType === 'audio/m4a' ? 'audio' : 'picture',
        status: 'uploading',
        icon: '',
        name: '',
        foods: [],
      })
      .returning({ id: mealsTable.id });

    return created({ mealId: meal.id });
  }
}
