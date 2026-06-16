import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {useContext} from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">

        <Link to={`/details/${product.id}`}>
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
          />
        </Link>

        <div className="card-body d-flex flex-column">
          <h5>{product.title}</h5>
          <p>{product.brand}</p>
          <h6>₹{product.price}</h6>

          <button
            className="btn btn-primary mt-auto"
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart!");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;