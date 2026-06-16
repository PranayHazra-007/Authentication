import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <select
        className="form-select"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((category, index) => (
          <option key={index} value={category.slug || category}>
            {category.name || category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;