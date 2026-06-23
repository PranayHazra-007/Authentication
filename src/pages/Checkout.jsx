import React from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.cart.user);
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    toast.success("Order Placed Successfully");

    dispatch(clearCart());

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Checkout
        </h2>

        <div className="card p-4 shadow">

          <h5>User Details</h5>

          <p>
            <strong>Name:</strong>{" "}
            {user?.username}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <hr />

          <h5>Order Items</h5>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between mb-2"
            >
              <span>
                {item.title} × {item.quantity}
              </span>

              <span>
                ₹
                {item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <h4>Total: ₹{total}</h4>

          <button
            className="btn btn-success mt-3"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>
    </>
  );
};

export default Checkout;