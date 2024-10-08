import BlogModel from "../models/BlogModel.js";
import { bucket } from "../routes/index.js";
import dotenv from "dotenv";
dotenv.config();

async function uploadFileToGCS(file) {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`blog_media/-${Date.now()}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error("Upload error:", err);
      reject(err);
    });

    blobStream.on("finish", () => {
      const mediaUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${blob.name}`;
      resolve(mediaUrl);
    });

    blobStream.end(file.buffer);
  });
}

async function createBlog(req, res) {
  try {
    const { author, title, content, links, like, comment } = req.body;

    const linksArray = links ? JSON.parse(links) : [];

    let mediaUrl = null;
    if (req.file) {
      mediaUrl = await uploadFileToGCS(req.file);
    }

    const payload = {
      author,
      title,
      content,
      links: linksArray,
      like,
      comment,
      media: mediaUrl,
    };

    const blog = new BlogModel(payload);
    const blogSave = await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      data: blogSave,
      success: true,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Error Creating Blog",
      error: error.message,
    });
  }
}

export default createBlog;
