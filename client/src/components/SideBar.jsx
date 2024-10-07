import { useEffect } from "react";
import Cookies from "js-cookie";
import blogLogo from "../assets/blogLogo.png";

const SideBar = ({ selectedTab, setSelectedTab }) => {
  useEffect(() => {
    if (window.bootstrap) {
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
      const dropdownElementList = Array.from(
        document.querySelectorAll(".dropdown-toggle")
      );
      dropdownElementList.forEach((dropdownToggleEl) => {
        new window.bootstrap.Dropdown(dropdownToggleEl);
      });
    }
  }, []);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3" style={{ minHeight: "100%" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img className="logo" src={blogLogo} alt="" width="50" height="50" />
        <span className="fs-4 text-white">BLOG APP</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={() => setSelectedTab("Home")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Home" && "active"}`} aria-current="page">
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </a>
        </li>
        <li onClick={() => setSelectedTab("Saved")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Saved" && "active"}`}>
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Saved
          </a>
        </li>
        <li onClick={() => setSelectedTab("Liked")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Liked" && "active"}`}>
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Liked
          </a>
        </li>
        <li onClick={() => setSelectedTab("Comments")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Comments" && "active"}`}>
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Comments
          </a>
        </li>
        <li onClick={() => setSelectedTab("Friends")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Friends" && "active"}`}>
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Friends
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img
            src={Cookies.get("sessionUserProfileImage") || "path/to/placeholder/image.png"}
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong className="text-white">{Cookies.get("sessionName")}</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" style={{ backgroundColor: "grey" }}>
          <li onClick={() => setSelectedTab("Create")}>
            <a className="dropdown-item" href="#">
              New Blog
            </a>
          </li>
          <li onClick={() => setSelectedTab("About")}>
            <a className="dropdown-item" href="#">
              About
            </a>
          </li>
          <li onClick={() => setSelectedTab("Blogs")}>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li onClick={() => setSelectedTab("Logout")}>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
