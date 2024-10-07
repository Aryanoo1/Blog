import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Logout = ({ setSelectedTab }) => {
  const navigate = useNavigate();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Would you Like to LOGOUT?</h1>
      <div className="d-flex gap-2 justify-content-center py-5">
        <button
          className="btn btn-outline-primary d-inline-flex align-items-center"
          style={{ fontWeight: "700" }}
          type="button"
          onClick={() => {
            Cookies.remove("sessionUsername");
            setSelectedTab("Home");
            navigate("/");
          }}
        >
          LOGOUT
          <TiTick className="iconAgree" />
        </button>
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center"
          style={{ fontWeight: "700" }}
          type="button"
          onClick={() => {
            setSelectedTab("Home");
            navigate("/blogs");
          }}
        >
          GO BACK
          <ImCross className="iconNotAgree" />
        </button>
      </div>
    </>
  );
};

export default Logout;
