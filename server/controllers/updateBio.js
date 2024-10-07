import UserModel from "../models/UserModel.js";

export const updateBio = async (req, res) => {
  const { username, newBio } = req.body;

  try {
    const user = await UserModel.findOne({ userName: username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.bio = newBio;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Bio updated successfully" });
  } catch (error) {
    console.error("Error updating bio:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
