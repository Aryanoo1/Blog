import BlogModel from "../models/BlogModel.js";

async function getBlogs(req, res) {
  try {
    const blogs = await BlogModel.find().sort({ like: -1 });

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
}

export default getBlogs;
