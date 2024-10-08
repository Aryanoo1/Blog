import BlogModel from "../models/BlogModel.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, userName, comment } = req.body;

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const newComment = {
      userName,
      comment,
    };

    blog.comment.push(newComment);
    await blog.save();

    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding comment" });
  }
};
