import UserModel from "../models/UserModel.js";

export const removeSaved = async (req, res) => {
  try {
    const { userName, blogId } = req.body;

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.saved.includes(blogId)) {
      return res.status(400).json({
        success: false,
        message: "Blog not found in saved list",
      });
    }

    user.saved = user.saved.filter((id) => id.toString() !== blogId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Blog removed from saved list",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
