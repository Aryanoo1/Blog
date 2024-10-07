import BlogModel from "../models/BlogModel.js";

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Unable to delete the blog.",
    });
  }
};
