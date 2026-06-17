import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../services/api";

const ProductForm = ({
  onSubmit,
  editProduct,
  cancelEdit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        description: editProduct.description || "",
        thumbnail: editProduct.thumbnail || "",
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        thumbnail: "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      const res = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        thumbnail: file.name,
      }));

      console.log(res.data);

      toast.success("Image uploaded successfully");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.category
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    onSubmit(formData);

    if (!editProduct) {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        thumbnail: "",
      });
    }
  };

  return (
    <div className="card shadow p-3 mb-4">
      <h4 className="mb-3">
        {editProduct ? "Update Product" : "Add Product"}
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">
            Product Title
          </label>

          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Price
          </label>

          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Category
          </label>

          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Upload Image
          </label>

          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        {formData.thumbnail && (
          <div className="mb-3">
            <small className="text-success">
              Image: {formData.thumbnail}
            </small>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={loading}
        >
          {editProduct
            ? "Update Product"
            : "Add Product"}
        </button>

        {editProduct && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </form>
    </div>
  );
};

export default ProductForm;