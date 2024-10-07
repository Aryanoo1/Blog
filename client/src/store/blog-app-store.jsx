import { createContext, useCallback, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const BlogList = createContext({
  blogList: [],
  userBlogList: [],
  addInitialBlogs: () => {},
  addInitialUserBlogs: () => {},
  addBlog: () => {},
  deleteBlog: () => {},
  bookmarkBlogs: [],
  setBookmarkBlogs: () => {},
});

const BlogListProvider = ({ children }) => {
  const [blogList, setBlogList] = useState([]);
  const [bookmarkBlogs, setBookmarkedBlogs] = useState([]);
  const [userBlogList, setUserBlogList] = useState([]);
  const addInitialBlogs = (newBlogList) => {
    setBlogList(newBlogList);
  };
  const addInitialUserBlogs = useCallback((newBlogList) => {
    setUserBlogList(newBlogList);
  }, []);
  const addBlog = async (newBlog) => {
    const data = {
      title: newBlog.title,
      content: newBlog.content,
      author: Cookies.get("sessionName"),
      links: newBlog.links,
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    const url = `${apiUrl}/api/create`;
    try {
      const res = await axios.post(url, data);
      if (res.data.success) {
        setBlogList([res.data.data, ...blogList]);
        setUserBlogList([res.data.data, ...userBlogList]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteBlog = (id) => {
    setBlogList(blogList.filter((blog) => blog.id !== id));
  };

  const setBookmarkBlogs = (newBlogList) => {
    setBookmarkedBlogs(newBlogList);
  };

  return (
    <BlogList.Provider
      value={{
        blogList,
        userBlogList,
        addInitialBlogs,
        addInitialUserBlogs,
        addBlog,
        deleteBlog,
        bookmarkBlogs,
        setBookmarkBlogs,
      }}
    >
      {children}
    </BlogList.Provider>
  );
};

export default BlogListProvider;
