import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export const getProducts = () => axios.get(BASE_URL);

export const getProduct = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const searchProducts = (q) =>
  axios.get(`${BASE_URL}/search?q=${q}`);

export const getCategories = () =>
  axios.get(`${BASE_URL}/categories`);


export const getProductsByCategory = (category) =>
  axios.get(`${BASE_URL}/category/${category}`);

export const addProduct = (data) =>
  axios.post(
    "https://dummyjson.com/products/add",
    data
  );

export const updateProduct = (id, data) =>
  axios.put(
    `https://dummyjson.com/products/${id}`,
    data
  );

export const deleteProduct = (id) =>
  axios.delete(
    `https://dummyjson.com/products/${id}`
  );

export const uploadImage = (file) => {
  const formData = new FormData();

  formData.append("image", file);

  return axios.post(
    "https://httpbin.org/post",
    formData
  );
};