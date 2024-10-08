import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

// Create a temporary file to store credentials if using JSON string
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const keyFilePath = path.join(__dirname, 'temp-credentials.json');
fs.writeFileSync(keyFilePath, JSON.stringify(credentials));

const storage = new Storage({
  keyFilename: keyFilePath,
});

export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

fs.unlinkSync(keyFilePath); // Clean up the temp file
