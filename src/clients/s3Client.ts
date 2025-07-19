import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client();

//export const s3Client = new S3Client({ region: 'sa-east-1' });

//s3Client.send(new PutObjectCommand({ Bucket: 'fooddiary' }));
