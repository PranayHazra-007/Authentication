import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotal,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      toast.error("Please Login First");
      navigate("/login");
      return;
    }

    toast.success("Checkout Successful!");
    clearCart();
  };

  return (
    <><Navbar/>
    <div className="container mt-4">
      <h2 className="mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <h4>Your Cart is Empty</h4>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3 p-3"
            >
              <div className="row align-items-center">

                <div className="col-md-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid"
                  />
                </div>

                <div className="col-md-3">
                  <h5>{item.title}</h5>
                  <p>₹{item.price}</p>
                </div>

                <div className="col-md-3">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-success ms-2"
                    onClick={() =>
                      increaseQty(item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="col-md-2">
                  ₹
                  {item.price * item.quantity}
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

          <div className="mt-4">
            <h3>Total: ₹{getTotal()}</h3>

            <Link to="/checkout" className="btn btn-primary me-3">
              Checkout
            </Link>

            <button
              className="btn btn-danger"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Cart;