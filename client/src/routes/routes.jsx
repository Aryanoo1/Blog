import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import BlogList from "../components/BlogList";
import AllBlogs from "../components/AllBlogs";
import CreateBlog from "../components/CreateBlog";
import Logout from "../components/Logout";
import About from "../components/About";
import LayoutWithVideoBackground from "../layout/LayoutWithVideoBackground";
import Saved from "../components/Saved";
import Liked from "../components/Liked";
import Comments from "../components/Comments";
import Friends from "../components/Friends";
import SearchResults from "../components/SearchResults";
import UserProfiles from "../components/UserProfiles";

const AppRoutes = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [userSelected, setUserSelected] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Routes>
        <Route
          path="/blogs"
          element={
            <LayoutWithVideoBackground
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              setFilteredUsers={setFilteredUsers}
              setUserSelected={setUserSelected}
            >
              {selectedTab === "Search" ? (
                <SearchResults
                  results={filteredUsers}
                  setUserSelected={setUserSelected}
                  setSelectedTab={setSelectedTab}
                />
              ) : selectedTab === "UserProfile" ? (
                <UserProfiles
                  username={userSelected}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              ) : selectedTab === "Home" ? (
                <AllBlogs />
              ) : selectedTab === "Saved" ? (
                <Saved />
              ) : selectedTab === "Liked" ? (
                <Liked />
              ) : selectedTab === "Comments" ? (
                <Comments />
              ) : selectedTab === "Friends" ? (
                <Friends
                  setUserSelected={setUserSelected}
                  setSelectedTab={setSelectedTab}
                />
              ) : selectedTab === "Create" ? (
                <CreateBlog setSelectedTab={setSelectedTab} />
              ) : selectedTab === "Blogs" ? (
                <BlogList />
              ) : selectedTab === "Logout" ? (
                <Logout setSelectedTab={setSelectedTab} />
              ) : (
                <About />
              )}
            </LayoutWithVideoBackground>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
