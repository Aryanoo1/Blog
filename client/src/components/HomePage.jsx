import { useNavigate } from "react-router-dom";
import homepageBackground from "../assets/homepage-background.png";
import AppHeader from "./AppHeader";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${homepageBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "auto",
          minHeight: "100vh",
          width: "auto",
          minWidth: "100vw",
        }}
      >
        <AppHeader />

        <div className="row flex justify-content-center mt-5">
          <div className="col-xl-8">
            <h1
              className="fw-bold text-body-emphasis lh-1 mb-3"
              style={{
                fontSize: "4rem",
                height: "auto",
                width: "auto",
              }}
            >
              Welcome to Our Blog Community
            </h1>
            <p className="lead" style={{ fontWeight: "600" }}>
              Join a thriving community of writers and readers. Share your
              stories, thoughts, and insights with the world, and discover
              engaging content from others. Whether you’re here to write, read,
              or explore, this is your space to connect.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg px-4 me-md-2"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-lg px-4"
                onClick={() => navigate("/signup")}
              >
                SIGNUP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
