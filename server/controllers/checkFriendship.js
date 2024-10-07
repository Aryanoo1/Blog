import UserModel from "../models/UserModel.js";

export const checkFriendship = async (req, res) => {
  try {
    const { userName, profileUserName } = req.body;

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFriend = user.friends.includes(profileUserName);

    return res.status(200).json({
      success: true,
      isFriend,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
