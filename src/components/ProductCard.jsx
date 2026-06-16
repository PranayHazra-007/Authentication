import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Product already in cart");
      return;
    }

    cart.push({
      ...product,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Product added to cart");
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">

        <Link to={`/details/${product.id}`}>
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
            style={{
              height: "200px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {product.title}
          </h5>

          <p className="card-text text-muted">
            {product.brand}
          </p>

          <h6 className="text-success">
            ₹{product.price}
          </h6>

          <p>
            {product.rating}
          </p>

          <button
            className="btn btn-primary mt-auto"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;