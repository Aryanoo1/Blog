import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import blogLogo from "../assets/blogLogo.png";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"; // Icons for the arrows

const SideBar = ({ selectedTab, setSelectedTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 sidebar ${
        isCollapsed ? "collapsed" : ""
      }`}
      style={{
        minHeight: "100vh",
        width: isCollapsed ? "80px" : "auto",
        transition: "width 0.3s",
        overflowY: "auto", // Allow vertical scrolling if necessary
        overflowX: "hidden", // Prevent horizontal scrolling
        position: "relative",
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {!isCollapsed && (
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <img
              className="logo"
              src={blogLogo}
              alt="Logo"
              width="50"
              height="50"
            />
          </a>
        )}
        <button
          className="btn btn-link text-white"
          onClick={toggleSidebar}
          style={{ border: "none" }}
        >
          {isCollapsed ? (
            <AiOutlineArrowRight size={24} />
          ) : (
            <AiOutlineArrowLeft size={24} />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item" onClick={() => setSelectedTab("Home")}>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectedTab === "Home" && "active"
                }`}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#home"></use>
                </svg>
                Home
              </a>
            </li>
            <li onClick={() => setSelectedTab("Saved")}>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectedTab === "Saved" && "active"
                }`}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#speedometer2"></use>
                </svg>
                Saved
              </a>
            </li>
            <li onClick={() => setSelectedTab("Liked")}>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectedTab === "Liked" && "active"
                }`}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#table"></use>
                </svg>
                Liked
              </a>
            </li>
            <li onClick={() => setSelectedTab("Comments")}>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectedTab === "Comments" && "active"
                }`}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#grid"></use>
                </svg>
                Comments
              </a>
            </li>
            <li onClick={() => setSelectedTab("Friends")}>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectedTab === "Friends" && "active"
                }`}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref="#people-circle"></use>
                </svg>
                Friends
              </a>
            </li>
          </ul>
        </>
      )}

      {/* Sidebar Footer (Dropdown) */}
      <div
        className="dropdown"
        style={{
          position: "absolute",
          bottom: "20px", // Ensure it stays at the bottom
          width: "100%",
        }}
      >
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => {
            setIsCollapsed(false);
          }}
        >
          <img
            src={
              Cookies.get("sessionUserProfileImage") ||
              "path/to/placeholder/image.png"
            }
            alt="Profile"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          {!isCollapsed && (
            <strong className="text-white">{Cookies.get("sessionName")}</strong>
          )}
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          style={{ backgroundColor: "grey" }}
        >
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
