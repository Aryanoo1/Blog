import UserModel from "../models/UserModel.js";

export const removeFriend = async (req, res) => {
  try {
    const { userName, profileUserName } = req.body;

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const friend = await UserModel.findOne({ userName: profileUserName });
    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.friends = user.friends.filter(fr => fr !== profileUserName);
    await user.save();

    friend.friends = friend.friends.filter(us => us !== userName);
    await friend.save();

    return res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
