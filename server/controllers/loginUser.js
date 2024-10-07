import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        error: true,
      });
    }

    const validPassword = bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password",
        error: true,
      });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };

    return res.status(200).json({
      message: "Login successful",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export default loginUser;
