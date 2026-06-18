import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { uploadImage, getCategories } from "../services/api";

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
    images:[]
  });
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        description: editProduct.description || "",
        images: editProduct.images || [],
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        images: [],
      });
    }
  }, [editProduct]);
  useEffect(() => {
  getCategories()
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);

  if (files.length === 0) return;

  try {
    setLoading(true);

    for (const file of files) {
      await uploadImage(file);
    }

    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));

    toast.success("Images uploaded successfully");
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
        images: [],
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
          <label className="form-label">Category</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                 <option value="">Select Category</option>
                 {categories.map((category, index) => (
                  <option key={index} value={category.slug || category}>
                     {category.name || category}
                  </option>))}
             </select>
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
            Upload Images
          </label>

          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleImageUpload}
          />
        </div>

        {formData.images && formData.images.length > 0 && (
          <div className="mb-3">
            <small className="text-success">
              Images: {formData.images.join(", ")}
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