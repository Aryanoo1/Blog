import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { bucket } from "../routes/index.js";
import dotenv from "dotenv";
dotenv.config();

async function uploadImage(file) {
  if (!file) return null;

  const fileName = `profile-images/${file.originalname}-${Date.now()}`;
  const blob = bucket.file(fileName);
  console.log("1 step");
  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });
    console.log("2 step");
    blobStream.on("error", (err) => {
      reject(err);
    });
    console.log("2 step");
    blobStream.on("finish", async () => {
      console.log("bucket name from env file: ", process.env.GCS_BUCKET_NAME);
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
      console.log("i am here");
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
