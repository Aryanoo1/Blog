import React from "react";

const SearchResults = ({ results, setUserSelected, setSelectedTab }) => {
  const handleUserClick = (username) => {
    setSelectedTab("UserProfile");
    setUserSelected(username);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div
        className="results-card p-4 shadow-lg rounded"
        style={{
          width: "350px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="mb-4" style={{ color: "#333" }}>
          Search Results
        </h3>
        {results.length > 0 ? (
          <ul className="list-unstyled">
            {results.map((user) => (
              <li
                key={user._id}
                className="my-2 p-2 rounded d-flex align-items-center"
                style={{
                  backgroundColor: "#f7f7f7",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
                  cursor: "pointer",
                }}
                onClick={() => handleUserClick(user.userName)}
              >
                <img
                  src={user.profileImage}
                  alt={`${user.userName}'s profile`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong style={{ color: "#007bff" }}>{user.userName}</strong>{" "}
                  <span style={{ color: "#555" }}>- {user.name}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#ff4d4d" }}>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
