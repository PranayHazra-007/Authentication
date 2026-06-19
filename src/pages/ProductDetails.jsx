import React from "react";
// import {getProduct} from "../services/api"
import { useParams } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {useSelector,useDispatch} from "react-redux";
import {addToCart} from "../redux/slices/cartSlice"

const ProductDetails = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState(null);
  // const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.products.find((p) => p.id === Number(id)));

  // useEffect(() => {
  //   getProduct(id).then((res) => {
  //     setProduct(res.data);
  //   });
  // }, [id]);

  if (!product) {
    return (
       <>
        <Navbar />
        <h2 className="text-center mt-5">
          Product Not Found
        </h2>
      </>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product Added To Cart");
  };

  return (
    <>
    <Navbar/>
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
    </>
  );
};

export default ProductDetails;