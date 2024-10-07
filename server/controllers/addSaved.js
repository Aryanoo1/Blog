import UserModel from "../models/UserModel.js";

export const addSaved = async (req, res) => {
  try {
    const { userName, blogId } = req.body;

    const user = await UserModel.findOne({ userName: userName });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.saved.includes(blogId)) {
      return res
        .status(400)
        .json({ success: false, message: "Blog already saved" });
    }

    user.saved.push(blogId);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
