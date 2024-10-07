import { useNavigate } from "react-router-dom";
import blogLogo from "../assets/blogLogo.png";
import AppHeader from "./AppHeader";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import loginBG from "../assets/loginBG.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/api/login`;
    try {
      const res = await axios.post(url, data);
      if (res.data.success) {
        Cookies.set("sessionName", res.data.data.userName, {
          path: "/",
          secure: true,
          expires: 1,
        });

        Cookies.set("sessionUserId", res.data.data._id, {
          path: "/",
          secure: true,
          expires: 1,
        });

        Cookies.set("sessionUserProfileImage", res.data.data.profileImage, {
          path: "/",
          secure: true,
          expires: 1,
        });
        setData({
          email: "",
          password: "",
        });
        navigate("/blogs");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${loginBG})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AppHeader />
      <div
        className="d-flex align-items-center py-4"
        style={{
          minHeight: "100vh",
          backgroundColor: "transparent !important",
        }}
      >
        <main className="form-signin w-100 m-auto login">
          <form onSubmit={handleSubmit}>
            <img
              className="mb-4 logo"
              src={blogLogo}
              alt=""
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating loginInput">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                value={data.email}
                placeholder="name@example.com"
                onChange={handleOnChange}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating loginInput">
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

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Log in
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
