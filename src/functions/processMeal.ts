import { ProcessMeal } from '../queues/ProcessMeal';
import { SQSEvent } from 'aws-lambda';

export async function handler(event: SQSEvent) {
  await Promise.all(
    event.Records.map(async record => {
      const body = JSON.parse(record.body);

      await ProcessMeal.process(body)
    })
  );
}
