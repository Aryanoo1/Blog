import BlogModel from "../models/BlogModel.js";

async function getBlogsOfUsers(req, res){
  try {
    const userName = req.query.username;

    const blogs = await BlogModel.find({ author: userName }).sort({
      bookmarked: -1,
      date: 1,
    });

    if (!blogs.length) {
      return res.status(404).json({
        message: "No blogs found for this user",
        error: true,
      });
    }

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user blogs",
      error: error.message,
    });
  }
};

export default getBlogsOfUsers;