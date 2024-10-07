import UserModel from "../models/UserModel.js";

export const getLikedBlogs = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await UserModel.findById(userId).populate("liked");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.liked.length === 0) {
      return res
        .status(200)
        .json({
          success: true,
          message: "No liked blogs found",
          likedBlogs: [],
        });
    }

    res.status(200).json({ success: true, likedBlogs: user.liked });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
