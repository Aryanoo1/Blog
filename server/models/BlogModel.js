import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "provide author"],
    },
    title: {
      type: String,
      required: [true, "provide title"],
    },
    content: {
      type: String,
      required: [true, "provide content"],
    },
    links: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    like: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Array,
      default: [],
    },
    comment: [
      {
        userName: {
          type: String,
          ref: "User",
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
    bookmarked: {
      type: Boolean,
      default: false,
    },
    media: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
