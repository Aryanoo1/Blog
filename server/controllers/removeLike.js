import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";

export const removeLike = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    if (!userId || !blogId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and Blog ID are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (!user.liked.includes(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not liked yet" });
    }

    user.liked = user.liked.filter((id) => id.toString() !== blogId);

    blog.liked = blog.liked.filter((id) => id.toString() !== userId);
    blog.like -= 1;

    await user.save();
    await blog.save();

    res.status(200).json({ success: true, message: "Blog unliked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
