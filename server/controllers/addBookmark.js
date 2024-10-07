import BlogModel from "../models/BlogModel.js";

async function addBookmark(req, res) {
  try {
    const { blogId, userName } = req.body;

    if (!userName) {
      return res.status(401).json({
        message: "Unauthorized. Please log in to bookmark posts.",
        error: true,
      });
    }

    const blog = await BlogModel.findOne({ _id: blogId });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        error: true,
      });
    }

    blog.bookmarked = !blog.bookmarked;
    await blog.save();

    return res.status(200).json({
      message: `Blog ${
        blog.bookmarked ? "bookmarked" : "unbookmarked"
      } successfully`,
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error toggling bookmark status",
      error: error.message,
    });
  }
}

export default addBookmark;
