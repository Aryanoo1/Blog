import UserModel from "../models/UserModel.js";

export const getUserDetails = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await UserModel.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found",
      data: user,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Error fetching user details." });
  }
};
