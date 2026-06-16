import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product Added To Cart");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <div className="row">

          <div className="col-md-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-7">

            <h2>{product.title}</h2>

            <p>{product.description}</p>

            <h4 className="text-success">
              ₹{product.price}
            </h4>

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Rating:</strong> {" "}
              {product.rating}
            </p>

            <p>
              <strong>Stock:</strong> {" "}
              {product.stock}
            </p>

            <button
              className="btn btn-primary mt-3"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;