import { SQSClient } from '@aws-sdk/client-sqs';

export const sqsClient = new SQSClient();

//export const s3Client = new S3Client({ region: 'sa-east-1' });

//s3Client.send(new PutObjectCommand({ Bucket: 'fooddiary' }));
