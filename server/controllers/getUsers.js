import UserModel from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  const { searchTerm } = req.query;
  
  try {
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required." });
    }

    const users = await UserModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { userName: { $regex: searchTerm, $options: "i" } }
      ]
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
