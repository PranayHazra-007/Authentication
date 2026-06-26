import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {fetchProducts,searchProducts,categoryProducts,fetchCategories} from "../redux/slices/productSlice";

const HomePage = () => {
const dispatch = useDispatch();

const {products,loading,error,categories} = useSelector((state) => state.product);
console.log(products);
console.log(categories);

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 8;

useEffect(() => {
  dispatch(fetchProducts());
  dispatch(fetchCategories());
}, [dispatch]);

const handleCategoryChange = async (category) => {
  try {
    if (category === "") {
      await dispatch(fetchProducts()).unwrap();
    } else {
      await dispatch(categoryProducts(category)).unwrap();
    }

    setCurrentPage(1);
  } catch (err) {
    toast.error("Failed to load category");
  }
};

const handleSearch = async (searchText) => {
  try {
    if (searchText.trim() === "") {
      await dispatch(fetchProducts()).unwrap();
    } else {
      await dispatch(searchProducts(searchText)).unwrap();
    }

    setCurrentPage(1);
  } catch (err) {
    toast.error("Search failed");
  }
};

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct =indexOfLastProduct - productsPerPage;
const currentProducts =products.slice(indexOfFirstProduct,indexOfLastProduct);
const totalPages =Math.ceil(products.length / productsPerPage);

if (loading) {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    </>
  );
}

if (error) {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h4 className="text-danger">
          {error}
        </h4>
      </div>
    </>
  );
}

return (
<>
<Navbar />


  <div className="container py-4">

    {currentUser?.email && (
      <div className="section-card mb-4">

        <div className="row align-items-center">

          <div className="col-md-8">

            <h1 className="display-5 fw-bold">
              Welcome Back,
              {" "}
              {currentUser.username}
            </h1>

            <p className="text-muted fs-5">
              Browse products,
              manage tasks,
              chat with users
              and manage your
              profile from one
              place.
            </p>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-sm p-4 text-center">

              <h2 className="fw-bold text-primary">
                {
                  products.length
                }
              </h2>

              <p className="text-muted mb-0">
                Total Products
              </p>

            </div>

          </div>

        </div>

      </div>
    )}

        <div className="section-card mb-4">

          <Search
            onSearch={
              handleSearch
            }
          />

          <div className="mt-3">
            <CategoryFilter
              onCategoryChange={
                handleCategoryChange
              }
            />
          </div>

        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h3 className="fw-bold">
            Products
          </h3>

          <span className="badge bg-primary fs-6">
            {
              products.length
            }{" "}
            Items
          </span>

        </div>

        <div className="row">

          {currentProducts.map(
            (item) => (
              <ProductCard
                key={
                  item.id
                }
                product={
                  item
                }
              />
            )
          )}

        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 mt-5 mb-5">

          <button
            className="btn btn-outline-primary"
            disabled={
              currentPage ===
              1
            }
            onClick={() =>
              setCurrentPage(
                currentPage -
                  1
              )
            }
          >
            Previous
          </button>

          {[
            ...Array(
              totalPages
            ),
          ].map(
            (
              _,
              index
            ) => (
              <button
                key={
                  index
                }
                className={`btn ${
                  currentPage ===
                  index +
                    1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() =>
                  setCurrentPage(
                    index +
                      1
                  )
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            className="btn btn-outline-primary"
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage +
                  1
              )
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
