import { useEffect, useState, useRef } from "react";
import { IoBookmarks } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { GoBookmarkFill, GoBookmarkSlashFill } from "react-icons/go";
import { FaHeart, FaPlayCircle, FaCommentDots } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const BlogCard = ({
  blog,
  selectedTab,
  isBookmarked,
  onBookmarkToggle,
  refreshBlogs,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [likeCount, setLikeCount] = useState(blog.like);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);
  const videoRef = useRef(null);
  const userName = Cookies.get("sessionName");
  const userId = Cookies.get("sessionUserId");
  const [commentCount, setCommentCount] = useState(blog.comment.length);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const handleDeleteConfirmation = async (confirm) => {
    if (confirm) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/api/deleteBlog`;

        const response = await axios.delete(url, {
          data: { blogId: blog._id },
        });

        if (response.data.success) {
          setShowDeletePopup(false);
          refreshBlogs();
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting blog:", error.message);
      }
    } else {
      setShowDeletePopup(false);
    }
  };

  const checkIfBlogIsSaved = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getSavedBlogs`;

      const response = await axios.post(url, { userName });

      if (response.data.success) {
        const savedBlogs = response.data.savedBlogs;
        const isBlogSaved = savedBlogs.some(
          (savedBlog) => savedBlog._id === blog._id
        );
        setIsSaved(isBlogSaved);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error checking saved blogs:", error.message);
    }
  };

  const checkIfBlogIsLiked = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getLikedBlogs`;
      const params = {
        userId,
      };
      const response = await axios.get(url, { params });

      if (response.data.success) {
        const likedBlogs = response.data.likedBlogs;
        const isBlogLiked = likedBlogs.some(
          (likedBlog) => likedBlog._id === blog._id
        );
        setIsLiked(isBlogLiked);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error checking liked blogs:", error.message);
    }
  };

  useEffect(() => {
    checkIfBlogIsSaved();
    checkIfBlogIsLiked();
  }, []);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const thumbnailUrl = canvas.toDataURL("image/jpeg");
    setThumbnail(thumbnailUrl);
  };

  const onSaveToggle = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/${isSaved ? "removeSaved" : "addSaved"}`;

      const response = await axios.post(url, { userName, blogId: blog._id });

      if (response.data.success) {
        setIsSaved(!isSaved);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(
        `Error ${isSaved ? "unsaving" : "saving"} blog:`,
        error.message
      );
    }
  };

  const onLikeToggle = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/${isLiked ? "removeLike" : "addLiked"}`;

      const response = await axios.post(url, {
        userId,
        blogId: blog._id,
      });

      if (response.data.success) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(
        `Error ${isLiked ? "removing like from" : "liking"} blog:`,
        error.message
      );
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const fetchComments = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getComments/${blog._id}`;
  
      const response = await axios.get(url);
      if (response.data.success) {
        console.log("comments:", response.data.comments);
        setComments(response.data.comments);
        setCommentCount(response.data.comments.length);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/addComment`;

      const response = await axios.post(url, {
        blogId: blog._id,
        userName,
        comment: newComment,
      });

      if (response.data.success) {
        setNewComment("");
        fetchComments();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/removeComment`;

      const response = await axios.delete(url, {
        data: { blogId: blog._id, userName, commentId },
      });

      if (response.data.success) {
        setNewComment("");
        fetchComments();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const toggleCommentsOverlay = () => {
    setShowCommentsOverlay(!showCommentsOverlay);
    if (!showCommentsOverlay) {
      fetchComments();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="mb-5 mt-5" style={{ width: "100%" }}>
      <div className="row g-0 border rounded overflow-hidden shadow-sm h-md-250 position-relative mx-1">
        <div className="col-md-8 p-4 d-flex flex-column position-static">
          <div className="d-flex justify-content-between align-items-center">
            <strong className="d-inline-block mb-2 text-white">
              {blog.author}
            </strong>
            {selectedTab === "YourBlogs" ? (
              <li
                className={`link badge ${
                  isBookmarked ? "link-warning" : "link-light"
                }`}
                style={{
                  zIndex: "2",
                  cursor: "pointer",
                }}
                onClick={() => onBookmarkToggle(blog._id)}
              >
                <IoBookmarks
                  style={{ marginRight: "2px", height: "2rem", width: "2rem" }}
                />
                <span>{isBookmarked ? "Unbookmark" : "Bookmark"}</span>
              </li>
            ) : (
              <li
                className={`link ${
                  isSaved ? "link-secondary" : "link-light"
                } badge`}
                style={{
                  zIndex: "2",
                  cursor: "pointer",
                }}
                onClick={onSaveToggle}
              >
                {isSaved ? (
                  <GoBookmarkSlashFill
                    style={{
                      marginRight: "2px",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                ) : (
                  <GoBookmarkFill
                    style={{
                      marginRight: "2px",
                      height: "2rem",
                      width: "2rem",
                    }}
                  />
                )}
                <span>{isSaved ? "Saved" : "Save"}</span>
              </li>
            )}
          </div>
          <h3 className="mb-0 text-white">{blog.title}</h3>
          <div className="mb-1 text-white">{formatDate(blog.date)}</div>{" "}
          <p className="card-text mb-auto text-white">{blog.content}</p>
          <div className="icon-link gap-1 icon-link-hover stretched-link">
            {blog.links.map((link, index) => (
              <a
                style={{ zIndex: "2" }}
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  link
                )}`}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
            <svg className="bi">
              <use xlinkHref="#chevron-right"></use>
            </svg>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <li
              className="link link-secondary badge"
              style={{
                zIndex: "1",
                cursor: "pointer",
                paddingRight: "0",
              }}
              onClick={onLikeToggle}
            >
              {isLiked ? (
                <FcLike style={{ fontSize: "1.5rem" }} />
              ) : (
                <FaHeart style={{ fontSize: "1.3rem", color: "white" }} />
              )}
            </li>
            <div
              className="text-white"
              style={{ fontSize: "1rem", zIndex: "1" }}
            >
              {likeCount}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <li
                className="link link-secondary badge"
                style={{
                  zIndex: "1",
                  cursor: "pointer",
                  paddingRight: "0",
                }}
                onClick={toggleCommentsOverlay}
              >
                <FaCommentDots style={{ fontSize: "1.5rem", color: "white" }} />
              </li>
              <div
                className="text-white"
                style={{ fontSize: "1rem", zIndex: "1" }}
              >
                {commentCount}
              </div>
            </div>

            {showCommentsOverlay && (
              <div
                className="popup-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  className="popup-content"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "100%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    maxHeight: "350px",
                    overflowY: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>Comments</h4>
                      <li
                        className="link badge text-black"
                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        onClick={toggleCommentsOverlay}
                      >
                        <ImCross />
                      </li>
                    </div>

                    <div
                      style={{
                        flex: "1",
                        overflowY: "auto",
                        marginBottom: "10px",
                        maxHeight: "150px",
                      }}
                    >
                      <ul>
                        {comments.map((comment) => (
                          <li
                            key={comment._id}
                            style={{ marginBottom: "10px" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <strong>{comment.userName}</strong>
                                  <span
                                    style={{
                                      fontSize: "0.8em",
                                      color: "gray",
                                      marginLeft: "8px",
                                    }}
                                  >
                                    {formatDate(comment.createdAt)}
                                  </span>
                                </div>
                                {comment.userName === userName ? (
                                  <div
                                    className="link badge text-black"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "0.8rem",
                                    }}
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                  >
                                    <MdDelete />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <p style={{ marginTop: "5px" }}>
                                {comment.comment}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        position: "sticky",
                        bottom: "0",
                        backgroundColor: "transparent",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment"
                          style={{
                            width: "100%",
                            padding: "10px",
                            marginRight: "5px",
                          }}
                          onKeyDown={handleKeyDown}
                        />
                        <button
                          onClick={handleAddComment}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            width: "50px",
                            display: "flex",
                            justifyContent: "cemter",
                            alignItems: "center",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedTab === "YourBlogs" && (
              <li
                className="link link-danger badge"
                style={{
                  zIndex: "2",
                  cursor: "pointer",
                }}
                onClick={handleDeleteClick}
              >
                <MdDelete style={{ marginRight: "2px", fontSize: "1.5rem" }} />
              </li>
            )}
          </div>
        </div>
        <div className="col-md-4">
          {blog.media ? (
            blog.media.endsWith(".mp4") ? (
              <div
                className="video-thumbnail"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "250px",
                  backgroundColor: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handlePlayClick}
              >
                {!isPlaying ? (
                  <>
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt="video-thumbnail"
                        className="bd-placeholder-img"
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        onLoadedData={captureThumbnail}
                        style={{ display: "none" }}
                      >
                        <source src={blog.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <FaPlayCircle
                      style={{
                        position: "absolute",
                        fontSize: "3rem",
                        color: "white",
                        zIndex: "1",
                      }}
                    />
                  </>
                ) : (
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    controls
                    autoPlay
                    style={{ zIndex: "1" }}
                  >
                    <source src={blog.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : (
              <img
                src={blog.media}
                alt="blog-image"
                className="bd-placeholder-img"
                width="100%"
                height="100%"
              />
            )
          ) : null}
        </div>
      </div>
      {showDeletePopup && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="popup-content"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
              Are you sure you want to delete this blog?
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={() => handleDeleteConfirmation(true)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handleDeleteConfirmation(false)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
