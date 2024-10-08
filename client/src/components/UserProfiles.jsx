import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import WelcomeMessage from "./WelcomeMessage";
import axios from "axios";
import Profile from "./Profile";
import UserBlogCard from "./UserBlogCard";

const UserProfiles = ({ username }) => {
  const [fetching, setFetching] = useState(false);
  const [userBlogList, setUserBlogList] = useState([]);

  useEffect(() => {
    const fetchUserDetailsAndBlogs = async () => {
      try {
        setFetching(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const blogResponse = await axios.get(`${apiUrl}/api/blogs/user`, {
          params: {
            username,
          },
        });
        setUserBlogList(blogResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUserDetailsAndBlogs();
  }, []);

  return (
    <div className="card-space">
      <Profile profileUserName={username} />
      {fetching && <LoadingSpinner />}
      {!fetching && userBlogList.length === 0 && <WelcomeMessage />}
      {!fetching &&
        userBlogList.map((blog) => {
          return (
            <UserBlogCard
              key={blog._id}
              blog={blog}
              profileUserName={username}
            />
          );
        })}
    </div>
  );
};

export default UserProfiles;
