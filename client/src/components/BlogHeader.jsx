const BlogHeader = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="container heading">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li
            className="tabs"
            onClick={() => {
              setSelectedTab("Home");
            }}
          >
            <a
              href="#"
              className={`nav-link text-white rounded-pill ${
                selectedTab === "Home" ? "bg-primary" : ""
              }`}
            >
              Home
            </a>
          </li>
          <li
            className="tabs"
            onClick={() => {
              setSelectedTab("Create");
            }}
          >
            <a
              href="#"
              className={`nav-link text-white rounded-pill ${
                selectedTab === "Create" ? "bg-primary" : ""
              }`}
            >
              Create
            </a>
          </li>
          <li
            className="tabs"
            onClick={() => {
              setSelectedTab("Blogs");
            }}
          >
            <a
              href="#"
              className={`nav-link text-white rounded-pill ${
                selectedTab === "Blogs" ? "bg-primary" : ""
              }`}
            >
              Blogs
            </a>
          </li>
          <li
            className="tabs"
            onClick={() => {
              setSelectedTab("Logout");
            }}
          >
            <a
              href="#"
              className={`nav-link text-white rounded-pill ${
                selectedTab === "Logout" ? "bg-primary" : ""
              }`}
            >
              Logout
            </a>
          </li>
          <li
            className="tabs"
            onClick={() => {
              setSelectedTab("About");
            }}
          >
            <a
              href="#"
              className={`nav-link text-white rounded-pill ${
                selectedTab === "About" ? "bg-primary" : ""
              }`}
            >
              About
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default BlogHeader;
