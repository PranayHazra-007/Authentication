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