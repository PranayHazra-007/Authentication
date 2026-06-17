import React, { useEffect, useState } from "react";
import {getCategories} from "../services/api"

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
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