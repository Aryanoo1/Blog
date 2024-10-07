import { useContext, useEffect, useState } from "react";
import { BlogList as BlogListData } from "../store/blog-app-store";
import axios from "axios";
import BlogCard from "./BlogCard";
import LoadingSpinner from "./LoadingSpinner";
import WelcomeMessage from "./WelcomeMessage";
import Cookies from "js-cookie";

const AllBlogs = () => {
  const { blogList, addInitialBlogs } = useContext(BlogListData);
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    setfetching(true);
    const fetchBlogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/api/blogs`;
        const params = {
          userName: Cookies.get("sessionName"),
        };
        const res = await axios.get(url, { withCredentials: true, params });
        setfetching(false);
        if (res.data.success) {
          addInitialBlogs(res.data.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="card-space col-9">
      {fetching && <LoadingSpinner />}
      {!fetching && blogList.length === 0 && <WelcomeMessage />}

      {!fetching &&
        blogList.map((blog) => (
          <BlogCard key={Math.random()} blog={blog} selectedTab={"AllBlogs"} />
        ))}
    </div>
  );
};

export default AllBlogs;
