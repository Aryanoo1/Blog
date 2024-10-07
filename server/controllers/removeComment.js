import BlogModel from "../models/BlogModel.js";

export const removeComment = async (req, res) => {
  try {
    const { blogId, userName, commentId } = req.body;
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const commentIndex = blog.comment.findIndex(
      (comment) =>
        comment._id.toString() === commentId && comment.userName === userName
    );

    if (commentIndex === -1) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    blog.comment.splice(commentIndex, 1);
    await blog.save();

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting comment" });
  }
};
