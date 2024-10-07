import { Router } from "express";
import registerUser from "../controllers/registerUser.js";
import loginUser from "../controllers/loginUser.js";
import addBookmark from "../controllers/addBookmark.js";
import createBlog from "../controllers/createBlog.js";
import { deleteBlog } from "../controllers/deleteBlog.js";
import getUserBlogs from "../controllers/getUserBlogs.js";
import getBlogs from "../controllers/getBlogs.js";
import { addFriend } from "../controllers/addFriend.js";
import { getFriends } from "../controllers/getFriends.js";
import { addSaved } from "../controllers/addSaved.js";
import { getSaved } from "../controllers/getSaved.js";
import { addLiked } from "../controllers/addLiked.js";
import { getLikedBlogs } from "../controllers/getLikedBlogs.js";
import { getBlogLikes } from "../controllers/getBlogLikes.js";
import { addComment } from "../controllers/addComment.js";
import { getCommentedBlogs } from "../controllers/getCommentedBlogs.js";
import { getBlogComments } from "../controllers/getBlogComments.js";
import { getUsers } from "../controllers/getUsers.js";
import getBlogsOfUsers from "../controllers/getBlogsOfUsers.js";
import { getSavedBlogs } from "../controllers/getSavedBlogs.js";
import { removeSaved } from "../controllers/removeSaved.js";
import { checkFriendship } from "../controllers/checkFriendship.js";
import { removeFriend } from "../controllers/removeFriend.js";
import { removeLike } from "../controllers/removeLike.js";
import {
  getUserDetails,
  updateUserBio,
  updateProfileImage,
} from "../controllers/ProfileController.js";
import multer from "multer";
import { updateBio } from "../controllers/updateBio.js";
import { getComments } from "../controllers/getComments.js";
import { removeComment } from "../controllers/removeComment.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

const router = Router();

// User-related routes
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/bookmark", addBookmark);
router.get("/users/search", getUsers);
router.get("/user", getUserDetails);
router.post("/updateBio", updateBio);

// Blog-related routes
router.post("/create", upload.single("media"), createBlog);
router.delete("/deleteBlog", deleteBlog);
router.get("/user/blogs", getUserBlogs);
router.get("/blogs", getBlogs);
router.get("/blogs/user", getBlogsOfUsers);

// Friend-related routes
router.post("/checkFriendship", checkFriendship);
router.post("/addFriend", addFriend);
router.post("/removeFriend", removeFriend);
router.get("/getFriends", getFriends);

// Saved blogs routes
router.post("/addSaved", addSaved);
router.post("/removeSaved", removeSaved);
router.get("/getSaved", getSaved);
router.post("/getSavedBlogs", getSavedBlogs);

// Liked blogs routes
router.post("/addLiked", addLiked);
router.post("/removeLike", removeLike);
router.get("/getLikedBlogs", getLikedBlogs);
router.get("/getBlogLikes", getBlogLikes);

// Comments-related routes
router.get("/getComments/:blogId", getComments);
router.post("/addComment", addComment);
router.delete("/removeComment", removeComment);

// Route to get user details
router.get("/getUserDetails", getUserDetails);

// Route to update user's bio
router.patch("/updateBio/:username", updateUserBio);

// Route to update user's profile image
router.post(
  "/uploadProfileImage",
  upload.single("profileImage"),
  updateProfileImage
);

export default router;
