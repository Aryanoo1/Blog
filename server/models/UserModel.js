import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name"],
    },
    email: {
      type: String,
      required: [true, "provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provide password"],
    },
    userName: {
      type: String,
      required: [true, "provide username"],
      unique: true,
    },
    friends: [
      {
        type: String,
      },
    ],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    comments: [
      {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
