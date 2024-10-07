import UserModel from "../models/UserModel.js";

export const getSavedBlogs = async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await UserModel.findOne({ userName }).populate("saved");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      savedBlogs: user.saved,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
