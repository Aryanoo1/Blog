import { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { BlogList as BlogListData } from "../store/blog-app-store";
import LoadingSpinner from "./LoadingSpinner";
import WelcomeMessage from "./WelcomeMessage";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "./Profile";

const BlogList = () => {
  const { userBlogList, addInitialUserBlogs, setBookmarkBlogs, bookmarkBlogs } =
    useContext(BlogListData);
  const [fetching, setFetching] = useState(false);
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const username = Cookies.get("sessionName");

  const refreshUserBlogList = async () => {
    try {
      setFetching(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/user/blogs`;
      const params = { userName: username };

      const res = await axios.get(url, { withCredentials: true, params });

      if (res.status === 200 && res.data.success) {
        addInitialUserBlogs(res.data.data);
      } else if (res.status === 200 && res.data.data.length === 0) {
        addInitialUserBlogs([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        addInitialUserBlogs([]);
      } else {
        console.log("Error refreshing blog list:", error);
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setFetching(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/api/user/blogs`;
        const params = { userName: username };
        const res = await axios.get(url, { withCredentials: true, params });
        if (res.data.success) {
          addInitialUserBlogs(res.data.data);
          const initialBookmarks = res.data.data.map((blog) => ({
            id: blog._id,
            isBookmarked: blog.bookmarked || false,
          }));
          setBookmarkedBlogs(initialBookmarks);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setFetching(false);
      }
    };
    fetchBlogs();
  }, [bookmarkBlogs, refreshTrigger]);

  const handleBookmarkToggle = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/bookmark`;
      const data = {
        blogId: id,
        userName: username,
      };

      const res = await axios.post(url, data);
      if (res.data.success) {
        setBookmarkBlogs((prev) =>
          prev.map((blog) =>
            blog.id === id
              ? { ...blog, isBookmarked: !blog.isBookmarked }
              : blog
          )
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="card-space col-9">
      <Profile profileUserName={username} />
      {fetching && <LoadingSpinner />}
      {!fetching && userBlogList.length === 0 && <WelcomeMessage />}
      {!fetching &&
        userBlogList.map((blog) => {
          const isBookmarked =
            bookmarkedBlogs.find((b) => b.id === blog._id)?.isBookmarked ||
            false;
          return (
            <BlogCard
              key={blog._id}
              blog={blog}
              selectedTab={"YourBlogs"}
              isBookmarked={isBookmarked}
              onBookmarkToggle={handleBookmarkToggle}
              refreshBlogs={refreshUserBlogList}
            />
          );
        })}
    </div>
  );
};

export default BlogList;
