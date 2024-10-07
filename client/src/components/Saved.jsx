import { useState, useEffect, useRef } from "react";
import { GoBookmarkSlashFill } from "react-icons/go";
import Cookies from "js-cookie";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";

const Saved = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);
  const userName = Cookies.get("sessionName");

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

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/api/getSaved`;
        const params = {
          userName,
        };
        const response = await axios.get(url, { params });

        if (response.data.success) {
          setBlogs(response.data.savedBlogs);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching saved blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBlogs();
  }, [userName]);

  const onUnsave = async (blogId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/removeSaved`;

      const response = await axios.post(url, { userName, blogId });

      if (response.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error unsaving blog:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (blogs.length === 0) {
    return <h1 className="text-white">No Saved Blogs Found</h1>;
  }

  return (
    <div className="col-7 mb-5 mt-5">
      {blogs.map((blog) => (
        <div
          className="row g-0 border rounded overflow-hidden shadow-sm h-md-250 position-relative mx-1"
          key={blog._id}
          style={{ marginBottom: "60px" }}
        >
          <div className="col-md-8 p-4 d-flex flex-column position-static">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="d-inline-block mb-2 text-white">
                {blog.author}
              </strong>
              <li
                className="link link-secondary badge"
                style={{ zIndex: "2", cursor: "pointer" }}
                onClick={() => onUnsave(blog._id)}
              >
                <GoBookmarkSlashFill
                  style={{
                    marginRight: "2px",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
                <span>Unsave</span>
              </li>
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

export default Saved;
