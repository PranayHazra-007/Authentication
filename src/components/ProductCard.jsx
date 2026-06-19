import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { CartContext } from "../context/CartContext";
import { useDispatch,useSelector } from "react-redux";
import {addToCart,increaseQty,decreaseQty} from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // const {
  //   cartItems,
  //   addToCart,
  //   increaseQty,
  //   decreaseQty,
  // } = useContext(CartContext);
  

  // Check if product already exists in cart
  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

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

          <p className="text-muted mb-1">
            {product.brand}
          </p>

          <h6 className="text-success">
            ₹{product.price}
          </h6>

          <p className="mb-3">
            ⭐ {product.rating}
          </p>

          {cartItem ? (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-auto">

              <button
                className="btn btn-danger"
                disabled={cartItem.quantity === 1}
                onClick={() => dispatch(decreaseQty(product.id))}
              >
                -
              </button>

              <span className="fw-bold fs-5">
                {cartItem.quantity}
              </span>

              <button
                className="btn btn-success"
                disabled={cartItem.quantity >= product.stock}
                onClick={() => dispatch(increaseQty(product.id))}
              >
                +
              </button>

            </div>
          ) : (
            <button
              className="btn btn-primary mt-auto"
              onClick={() => {
                dispatch(addToCart(product));
                toast.success("Added to Cart");
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