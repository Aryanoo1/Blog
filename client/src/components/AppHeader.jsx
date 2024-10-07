import blogLogo from "../assets/blogLogo.png";

const AppHeader = () => {
  return (
    <div className="container appheader">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img className="logo" src={blogLogo} alt="" width="50" height="50" />
          <span className="fs-4">BLOG APP</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link text-black" style={{fontWeight: "700", fontSize: "1.2rem"}} aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black" style={{fontWeight: "700", fontSize: "1.2rem"}}>
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black" style={{fontWeight: "700", fontSize: "1.2rem"}}>
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black" style={{fontWeight: "700", fontSize: "1.2rem"}}>
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-black" style={{fontWeight: "700", fontSize: "1.2rem"}}>
              About
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default AppHeader;
