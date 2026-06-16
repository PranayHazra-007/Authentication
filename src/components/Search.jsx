import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <div className="d-flex gap-2 my-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;