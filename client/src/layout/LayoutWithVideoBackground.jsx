import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Search from "../components/Search";

const LayoutWithVideoBackground = ({
  children,
  selectedTab,
  setSelectedTab,
  setFilteredUsers,
}) => {
  const [collapsed, setCollapsed] = useState(true);

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
        <source src="/northern-lights.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar */}
        <SideBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isCollapsed={collapsed} 
          setIsCollapsed={setCollapsed}
        />

        {/* Main content */}
        <div
          style={{
            flexGrow: 1,
            marginLeft: collapsed ? "0" : "0", // Adjust margin based on collapse state
            display: "flex",
            flexDirection: "column",
            height: "100%",
            zIndex: 0,
            transition: "margin-left 0.3s ease", // Smooth transition when sidebar collapses/expands
          }}
        >
          {/* Search bar at the top */}
          <div
            style={{
              position: "relative",
              top: 0,
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
            }}
          >
            <Search
              setFilteredUsers={setFilteredUsers}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>

          {/* Main content area */}
          <div
            style={{
              flexGrow: 1,
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
