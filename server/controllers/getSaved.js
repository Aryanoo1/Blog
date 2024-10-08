import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";

export const getSaved = async (req, res) => {
  try {
    const { userName } = req.query;

    const user = await UserModel.findOne({ userName }).populate("saved");
    
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const savedBlogs = await BlogModel.find({
      _id: { $in: user.saved }
    });

    res.status(200).json({ success: true, savedBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
