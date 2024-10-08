import UserModel from "../models/UserModel.js";
import { bucket } from "../routes/index.js";
import dotenv from "dotenv";
dotenv.config();

export const getUserDetails = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await UserModel.findOne({ userName: username })
      .select("name userName bio profileImage friends liked comments saved")
      .populate("liked")
      .populate("comments.blogId");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUserBio = async (req, res) => {
  const { username } = req.params;
  const { bio } = req.body;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { userName: username },
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bio updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfileImage = async (req, res) => {
  const { username } = req.query;
  const { file } = req;

  console.log("user reached to change profile in backend: ", username);

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const fileName = `profile-images/${file.originalname}-${Date.now()}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on("error", (err) => {
      console.error("Error uploading file to GCS:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload image" });
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;

      const updatedUser = await UserModel.findOneAndUpdate(
        { userName: username },
        { profileImage: publicUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "Profile image updated successfully",
        user: updatedUser,
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
