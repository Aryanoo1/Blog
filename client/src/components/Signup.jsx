import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import signup_background_video from "../assets/signup-background-video.mp4";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("bio", data.bio);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1",
          }}
        >
          <source src={signup_background_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <AppHeader />
        <div className="container" style={{ backgroundColor: "transparent" }}>
          <div className="row align-items-center g-lg-5 pb-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                Join Our Blogging Community
              </h1>
              <p className="col-lg-10 fs-4">
                Sign up today to share your stories and connect with fellow
                writers. Create an account to start your blogging journey and
                explore the ideas of others. It’s free and easy!
              </p>
            </div>

            <div className="col-md-10 mx-auto col-lg-5 signup-form">
              <div className="text-center mb-4">
                <div
                  className="profile-image-container"
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    backgroundColor: profileImage
                      ? "transparent"
                      : "#f0f0f0",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #ddd",
                  }}
                >
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: "#999",
                        fontSize: "24px",
                      }}
                    >
                      Add Image
                    </span>
                  )}
                  <div
                    className="edit-image-overlay"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("profileImageInput").click()
                    }
                  >
                    ✎
                  </div>
                </div>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              <form
                className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
                onSubmit={handleSubmit}
              >
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    name="name"
                    value={data.name}
                    placeholder="Full Name"
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="floatingName">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingUserName"
                    name="userName"
                    value={data.userName}
                    placeholder="UserName"
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="floatingUserName">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    name="email"
                    value={data.email}
                    placeholder="name@example.com"
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="floatingEmail">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    value={data.password}
                    placeholder="Password"
                    onChange={handleOnChange}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="floatingBio"
                    name="bio"
                    value={data.bio}
                    placeholder="Tell us about yourself"
                    onChange={handleOnChange}
                    style={{ height: "100px" }}
                  />
                  <label htmlFor="floatingBio">Bio</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign Up
                </button>
                <hr className="my-4" />
                <small className="text-body-secondary">
                  By clicking Sign up, you agree to our terms of use.
                </small>
              </form>
              <p className="my-3 text-center">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="hover:text-primary font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
