import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Friends = ({ setUserSelected, setSelectedTab }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUserClick = (username) => {
    setSelectedTab("UserProfile");
    setUserSelected(username);
  };

  const fetchFriends = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getFriends`;

      const params = {
        userName: Cookies.get("sessionName"),
      };
      const response = await axios.get(url, { params });
      if (response.data.success) {
        setFriends(response.data.friends);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error fetching friends: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  if (loading) {
    return <div className="friends-loading">Loading...</div>;
  }

  if (error) {
    return <div className="friends-error">{error}</div>;
  }

  return (
    <div className="friends-container">
      <h3 className="friends-title">Friends</h3>
      <ul className="friends-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li
              key={friend._id}
              className="friends-item d-flex align-items-center my-2"
              style={{ cursor: "pointer", backgroundColor: "#f7f7f7", padding: "10px", borderRadius: "10px", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleUserClick(friend.userName)}
            >
              <img
                src={friend.profileImage}
                alt={`${friend.userName}'s profile`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <strong>{friend.userName}</strong>
              </div>
            </li>
          ))
        ) : (
          <h2 className="text-white">No Friends</h2>
        )}
      </ul>
    </div>
  );
};

export default Friends;
