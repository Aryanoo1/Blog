import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = ({ profileUserName }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    bio: "",
    friendsCount: 0,
    profileImage: "",
  });
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const username = Cookies.get("sessionName");

  const checkFriendshipStatus = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/checkFriendship`;

      const data = {
        userName: username,
        profileUserName,
      };

      const res = await axios.post(url, data, { withCredentials: true });

      if (res.data.success) {
        setIsFollowing(res.data.isFriend);
      }
    } catch (error) {
      console.error("Error checking friendship status:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/getUserDetails`;

      const res = await axios.get(url, {
        params: { username: profileUserName },
        withCredentials: true,
      });

      if (res.data.success) {
        const userFriends = res.data.user.friends.length;
        setUserDetails({
          fullName: res.data.user.name,
          bio: res.data.user.bio,
          friendsCount: userFriends,
          profileImage: res.data.user.profileImage,
        });
        setNewBio(res.data.user.bio);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/${isFollowing ? "removeFriend" : "addFriend"}`;

      const data = {
        userName: Cookies.get("sessionName"),
        profileUserName,
      };

      const res = await axios.post(url, data, { withCredentials: true });

      if (res.data.success) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
    }
  };

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Please upload a valid image file.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error("File size exceeds the 2MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/uploadProfileImage`;

      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          username: profileUserName,
        },
      });

      if (res.data.success) {
        console.log("Profile image uploaded successfully.");
        fetchUserDetails();
      } else {
        console.error("Failed to upload profile image.");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error.message);
    }
  };

  const handleBioSubmit = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/updateBio`;

      const data = {
        username: profileUserName,
        newBio,
      };

      const res = await axios.post(url, data, { withCredentials: true });

      if (res.data.success) {
        console.log("Bio updated successfully.");
        setIsEditingBio(false);
        fetchUserDetails();
      } else {
        console.error("Failed to update bio.");
      }
    } catch (error) {
      console.error("Error updating bio:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    checkFriendshipStatus();
  }, [profileUserName]);

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleCloseOverlay = () => {
    setIsEditingBio(false);
  };

  return (
    <div className="profile">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "30px",
        }}
      >
        <div className="profile-image">
          {userDetails.profileImage ? (
            <img
              src={userDetails.profileImage}
              alt={`${userDetails.name}'s profile`}
            />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            style={{ display: "none" }}
            id="profileImageInput"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label
            htmlFor="profileImageInput"
            className="btn btn-outline-light profile-edit-label"
          >
            {userDetails.profileImage ? "Edit Image" : "Add Image"}
          </label>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-username">{profileUserName}</div>
        <div className="profile-name">
          {userDetails.fullName || "Full Name"}
        </div>
        <div className="profile-bio">
          {userDetails.bio || "This is the user's bio. It can be a short description about the user."}
        </div>
        <div className="profile-friends-count">
          Friends: {userDetails.friendsCount || 0}
        </div>

        {username === profileUserName && (
          <button className="btn btn-outline-light" onClick={handleEditBio}>
            Edit Bio
          </button>
        )}
        
        {isFollowing && (
          <button
            className="profile-follow-button btn btn-outline-light"
            onClick={handleFollowToggle}
          >
            Unfollow
          </button>
        )}
      </div>

      {isEditingBio && (
        <div className="bio-overlay">
          <div className="bio-overlay-content">
            <h2 className="text-black">Edit Your Bio</h2>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              rows="4"
              className="form-control"
            />
            <div className="bio-overlay-buttons">
              <button className="btn btn-success" onClick={handleBioSubmit}>
                Save
              </button>
              <button className="btn btn-danger" onClick={handleCloseOverlay}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
