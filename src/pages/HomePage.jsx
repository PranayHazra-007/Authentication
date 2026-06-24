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

const products = useSelector(
(state) => state.product?.products || []
);

const currentUser = JSON.parse(
localStorage.getItem("currentUser")
);

const [currentPage, setCurrentPage] =
useState(1);

const productsPerPage = 8;

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = () => {
getProducts()
.then((res) => {
dispatch(
setProducts(
res.data.products
)
);

    setCurrentPage(1);
  })
  .catch((err) =>
    console.log(err)
  );


};

const handleCategoryChange = (
category
) => {
if (category === "") {
fetchProducts();
} else {
getProductsByCategory(
category
)
.then((res) => {
dispatch(
setProducts(
res.data.products
)
);


      setCurrentPage(1);
    })
    .catch((err) =>
      console.log(err)
    );
}


};

const handleSearch = (
searchText
) => {
if (
searchText.trim() === ""
) {
fetchProducts();
} else {
searchProducts(
searchText
)
.then((res) => {
dispatch(
setProducts(
res.data.products
)
);


      setCurrentPage(1);
    })
    .catch((err) =>
      console.log(err)
    );
}


};

const indexOfLastProduct =
currentPage *
productsPerPage;

const indexOfFirstProduct =
indexOfLastProduct -
productsPerPage;

const currentProducts =
products.slice(
indexOfFirstProduct,
indexOfLastProduct
);

const totalPages =
Math.ceil(
products.length /
productsPerPage
);

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
