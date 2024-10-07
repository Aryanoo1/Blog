import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";

const Search = ({ setFilteredUsers, setSelectedTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const userName = Cookies.get("sessionName");

  const handleOnclick = async () => {
    try {
      setSelectedTab("Search");
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/users/search`;
      console.log(searchTerm);
      const response = await axios.get(url, {
        params: { searchTerm },
      });

      const filteredResults = response.data.filter(
        (user) => user.userName !== userName
      );

      setFilteredUsers(filteredResults);
      setErrorMessage(null);
    } catch (error) {
      setFilteredUsers([]);
      setErrorMessage(error.response?.data?.message || "Error fetching users.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOnclick();
    }
  };

  return (
    <header className="search-header">
      <div className="search-container">
        <div className="search-wrapper">
          <form className="me-3" role="search">
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
          <button
            className="rounded-circle btn btn-outline-light search-button"
            onClick={handleOnclick}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Search;
