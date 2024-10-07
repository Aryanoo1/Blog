import UserModel from "../models/UserModel.js";

export const addFriend = async (req, res) => {
  try {
    const { userName, profileUserName } = req.body;

    const user = await UserModel.findOne({ userName: userName });
    const friend = await UserModel.findOne({ userName: profileUserName });

    if (!user || !friend) {
      return res
        .status(404)
        .json({ success: false, message: "One or both users not found" });
    }

    if (user.friends.includes(profileUserName)) {
      return res
        .status(400)
        .json({ success: false, message: "Friend already added" });
    }

    user.friends.push(profileUserName);

    if (!friend.friends.includes(userName)) {
      friend.friends.push(userName);
    }

    await user.save();
    await friend.save();

    return res
      .status(200)
      .json({ success: true, message: "Friend added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
