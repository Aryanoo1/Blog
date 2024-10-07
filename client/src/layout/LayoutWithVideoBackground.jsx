import React from "react";
import SideBar from "../components/SideBar";
import Search from "../components/search";

const LayoutWithVideoBackground = ({
  children,
  selectedTab,
  setSelectedTab,
  setFilteredUsers,
}) => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/src/assets/northern-lights.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ display: "flex", height: "100%" }}>
=        <div
          style={{
            width: "uto",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        >
          <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div
          style={{
            flexGrow: 1,
            marginLeft: "200px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              top: 0,
              height: "60px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            <Search
              setFilteredUsers={setFilteredUsers}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              overflowY: "auto",
              height: "calc(100vh - 60px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWithVideoBackground;
