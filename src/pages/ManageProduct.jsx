import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import {fetchProducts,addProduct,updateProduct,fetchCategories,deleteProduct} from "../redux/slices/productSlice";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] =useState([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] =useState(null);

  useEffect(() => {
  dispatch(fetchProducts());
  dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
  if (search.trim() === "") {
    setFilteredProducts(products);
  } else {
    setFilteredProducts(
      products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    );
  }
}, [products, search]);

  // Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  // Add & Update
  const handleSubmit = async (formData) => {
    try {
     if (editProduct) {
      await dispatch(updateProduct({
      id: editProduct.id,...formData,})).unwrap();
      dispatch(fetchProducts());
      setEditProduct(null);
      toast.success("Product Updated Successfully");
     }else {
        await dispatch(addProduct(formData)).unwrap();
          dispatch(fetchProducts());
          toast.success("Product Added Successfully");
        }

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  // Edit
  const handleEdit = (product) => {
    setEditProduct(product);
  };
  // Delete
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?"))
      return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
        dispatch(fetchProducts());
        toast.success("Product Deleted Successfully");
    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }
  };
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

      <div className="container mt-4">
        <h2 className="mb-4"> Manage Products</h2>
        
        {/* Search */}

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            value={search}
            onChange={handleSearch}
          />

        </div>

        {/* Product Form */}

        <ProductForm
          onSubmit={handleSubmit}
          editProduct={editProduct}
          cancelEdit={() =>
            setEditProduct(null)
          }
        />

        {/* Product Table */}

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </>
  );
};

export default ManageProduct;