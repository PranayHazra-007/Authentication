import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
addToCart,
increaseQty,
decreaseQty,
} from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
const dispatch = useDispatch();

const cartItems = useSelector(
(state) => state.cart.cartItems
);

const cartItem = cartItems.find(
(item) => item.id === product.id
);

return ( <div className="col-md-6 col-lg-3 mb-4">

  <div className="card h-100 border-0 shadow-sm overflow-hidden">

    <Link to={`/details/${product.id}`}>

      <div
        style={{
          height: "220px",
          overflow: "hidden",
          background: "#f8fafc",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img-top"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "0.4s",
            cursor: "pointer",
          }}
        />
      </div>

    </Link>

    <div className="card-body d-flex flex-column p-3">

      <h5
        className="card-title fw-bold"
        style={{
          minHeight: "48px",
        }}
      >
        {product.title}
      </h5>

      <span className="badge bg-light text-dark mb-2 align-self-start">
        {product.brand}
      </span>

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5 className="text-success fw-bold mb-0">
          ₹{product.price}
        </h5>

        <span className="badge bg-warning text-dark">
          ⭐ {product.rating}
        </span>

      </div>

      {cartItem ? (

        <div className="d-flex justify-content-center align-items-center gap-3 mt-auto">

          <button
            className="btn btn-outline-danger"
            disabled={cartItem.quantity === 1}
            onClick={() =>
              dispatch(
                decreaseQty(product.id)
              )
            }
          >
            -
          </button>

          <span className="fw-bold fs-5">
            {cartItem.quantity}
          </span>

          <button
            className="btn btn-outline-success"
            disabled={
              cartItem.quantity >=
              product.stock
            }
            onClick={() =>
              dispatch(
                increaseQty(product.id)
              )
            }
          >
            +
          </button>

        </div>

      ) : (

        <button
          className="btn btn-primary mt-auto fw-semibold"
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(
              "Added to Cart"
            );
          }}
        >
          Add To Cart
        </button>

      )}

    </div>
  </div>
</div>


);
};

export default ProductCard;
