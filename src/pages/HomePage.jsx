import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../services/api";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const user = localStorage.getItem("user");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        dispatch(setProducts(res.data.products));
        setCurrentPage(1);
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = (category) => {
    if (category === "") {
      fetchProducts();
    } else {
      getProductsByCategory(category)
        .then((res) => {
          dispatch(setProducts(res.data.products));
          setCurrentPage(1);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSearch = (searchText) => {
    if (searchText.trim() === "") {
      fetchProducts();
    } else {
      searchProducts(searchText)
        .then((res) => {
          dispatch(setProducts(res.data.products));
          setCurrentPage(1);
        })
        .catch((err) => console.log(err));
    }
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  return (
    <>
      {user?.email && (
        <Navbar />
      )}

      <div className="container mt-4">
        <Search onSearch={handleSearch} />

        <CategoryFilter
          onCategoryChange={handleCategoryChange}
        />

        <div className="row mt-4">
          {currentProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>

        {/* Pagination */}

        <div className="d-flex justify-content-center mt-4 mb-5">

          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
};

export default HomePage;