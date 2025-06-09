import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: mimeType,
    ACL: "public-read" as const,
  };

  const command = new PutObjectCommand(uploadParams);
  await client.send(command);

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  return fileUrl;
}
