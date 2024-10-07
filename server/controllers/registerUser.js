import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

async function uploadImage(file) {
  if (!file) return null;

  const fileName = `profile-images/${file.originalname}-${Date.now()}`;
  const blob = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
}

async function registerUser(req, res) {
  try {
    const { name, email, password, userName, bio } = req.body;

    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = await uploadImage(req.file);
    }

    const payload = {
      name,
      email,
      password: hashPassword,
      userName,
      profileImage: profileImageUrl,
      bio,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
}

export default registerUser;
