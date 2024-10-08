import { Storage } from '@google-cloud/storage';
import fs from 'fs/promises'; // Use promises version of fs
import path from 'path';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeStorage() {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const keyFilePath = path.join(__dirname, 'temp-credentials.json');

  try {
    await fs.writeFile(keyFilePath, JSON.stringify(credentials));

    const storage = new Storage({
      keyFilename: keyFilePath,
    });

    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    
    return bucket;
  } catch (error) {
    console.error("Error initializing storage:", error);
  } finally {
    try {
      await fs.unlink(keyFilePath);
    } catch (unlinkError) {
      console.error("Error deleting temporary credentials file:", unlinkError);
    }
  }
}

export const bucket = await initializeStorage();
