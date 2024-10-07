import { useState, useEffect, useRef } from "react";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";
import { FaPlayCircle } from "react-icons/fa";

const Liked = () => {
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);
  const userId = Cookies.get("sessionUserId");

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

  useEffect(() => {
    fetchLikedBlogs();
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

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const fetchLikedBlogs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getLikedBlogs`;
      const response = await axios.get(url, { params: { userId } });

      if (response.data.success) {
        setLikedBlogs(response.data.likedBlogs);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching liked blogs:", error.message);
    }
  };

  const handleUnlike = async (blogId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/removeLike`;
      const response = await axios.post(url, { userId, blogId });

      if (response.data.success) {
        setLikedBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error unliking blog:", error.message);
    }
  };

  if (likedBlogs.length === 0) {
    return <h1 className="text-white">No Liked Blogs Found</h1>;
  }

  return (
    <div className="col-7 mb-5 mt-5">
      {likedBlogs.map((blog) => (
        <div
          className="row g-0 border rounded overflow-hidden shadow-sm h-md-250 position-relative mx-1" // Added bottom margin here
          key={blog._id}
          style={{ marginBottom: "60px" }}
        >
          <div className="col-md-8 p-4 d-flex flex-column position-static">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="d-inline-block mb-2 text-white">
                {blog.author}
              </strong>
            </div>
            <h3 className="mb-0 text-white">{blog.title}</h3>
            <div className="mb-1 text-white">{formatDate(blog.date)}</div>
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
              <button
                type="button"
                className="btn"
                style={{
                  zIndex: "2",
                }}
                onClick={() => handleUnlike(blog._id)}
              >
                {<FcLike style={{ fontSize: "1.5rem" }} />}
              </button>
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
      ))}
    </div>
  );
};

export default Liked;
