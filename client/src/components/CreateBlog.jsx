import { useContext, useRef, useState } from "react";
import { BlogList } from "../store/blog-app-store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CreateBlog = ({ setSelectedTab }) => {
  const navigate = useNavigate();
  const { addBlog } = useContext(BlogList);
  const postTitleElement = useRef();
  const postContentElement = useRef();
  const linksElement = useRef();
  const [mediaFile, setMediaFile] = useState(null); // State for media file
  const [mediaPreview, setMediaPreview] = useState(null); // State for media preview
  const username = Cookies.get("sessionName");

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      console.error("File size exceeds the 20MB limit.");
      return;
    }
    if (file) {
      setMediaFile(file); // Update state with selected file
      setMediaPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postTitle = postTitleElement.current.value;
    const postContent = postContentElement.current.value;
    const links = linksElement.current.value
      .split(" ")
      .map((link) => link.trim())
      .filter((link) => link !== "");

    console.log("links: ", links);

    try {
      const payload = new FormData();
      payload.append("author", username);
      payload.append("title", postTitle);
      payload.append("content", postContent);
      payload.append("links", JSON.stringify(links));
      if (mediaFile) {
        payload.append("media", mediaFile);
      }
      console.log("payload.links : ", payload);
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/create`;
      await axios.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedTab("Blogs");
      navigate("/blogs");
    } catch (error) {
      console.error("Error posting blog:", error);
    }

    postTitleElement.current.value = "";
    postContentElement.current.value = "";
    linksElement.current.value = "";
    setMediaFile(null);
    setMediaPreview(null);
  };

  return (
    <div className="create-post create-blog-container">
      <div className="card create-blog">
        <div className="card-body create-blog-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="media" className="form-label">
                Upload Image/Video
              </label>
              <div
                className="media-upload-box"
                onClick={() => document.getElementById("media").click()}
              >
                {!mediaPreview ? (
                  <div className="media-placeholder">
                    <p>Click to upload image or video</p>
                  </div>
                ) : (
                  <div className="media-preview">
                    {mediaFile.type.startsWith("image/") ? (
                      <img
                        src={mediaPreview}
                        alt="Uploaded Media Preview"
                        className="img-fluid"
                        style={{ maxHeight: "300px" }}
                      />
                    ) : (
                      <video
                        controls
                        src={mediaPreview}
                        className="img-fluid"
                        style={{ maxHeight: "300px" }}
                      />
                    )}
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*,video/*"
                className="form-control"
                id="media"
                onChange={handleMediaChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Post Title
              </label>
              <input
                type="text"
                ref={postTitleElement}
                className="form-control"
                id="title"
                placeholder="Add Title for your Blog here..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="body" className="form-label">
                Post Content
              </label>
              <textarea
                type="text"
                ref={postContentElement}
                rows="4"
                className="form-control"
                id="content"
                placeholder="Add the blog content here..."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="links" className="form-label">
                Enter any Links or References
              </label>
              <input
                type="text"
                ref={linksElement}
                className="form-control"
                id="links"
                placeholder="Please keep space between multiple links..."
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              POST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
