import BlogModel from "../models/BlogModel.js";

export const getBlogLikes = async (req, res) => {
  try {
    const { blogId } = req.query;

    if (!blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }

    const blog = await BlogModel.findById(blogId).populate("liked", "userName");
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, likedUsers: blog.liked });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
