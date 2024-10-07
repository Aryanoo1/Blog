import UserModel from "../models/UserModel.js";

export const getFriends = async (req, res) => {
  try {
    const { userName } = req.query;
    const user = await UserModel.findOne({ userName });

    console.log("user: ", user);
    
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const friendsData = await UserModel.find({ 
      userName: { $in: user.friends }
    });

    res.status(200).json({ success: true, friends: friendsData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
