import BlogModel from "../models/BlogModel.js";

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, comments: blog.comment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching comments" });
  }
};
