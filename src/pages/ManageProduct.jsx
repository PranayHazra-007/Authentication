import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import toast from "react-hot-toast";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] =useState([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] =useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  };
  // Search
  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = products.filter((item) =>
      item.title
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  };
  // Add & Update
  const handleSubmit = async (formData) => {
    try {

      if (editProduct) {

        const res = await updateProduct(
          editProduct.id,
          formData
        );

        const updated = products.map((item) =>
          item.id === editProduct.id
            ? res.data
            : item
        );

        setProducts(updated);

        setFilteredProducts(updated);

        setEditProduct(null);

        toast.success(
          "Product Updated Successfully"
        );

      } else {

        const res = await addProduct(formData);

        const updated = [
          ...products,
          res.data,
        ];

        setProducts(updated);

        setFilteredProducts(updated);

        toast.success(
          "Product Added Successfully"
        );
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

    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {

      await deleteProduct(id);

      const updated = products.filter(
        (item) => item.id !== id
      );

      setProducts(updated);

      setFilteredProducts(updated);

      toast.success(
        "Product Deleted Successfully"
      );

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }
  };
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