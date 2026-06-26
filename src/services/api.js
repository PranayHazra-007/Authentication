import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET
export const getData = (url = "") => {
  return axios.get(`${BASE_URL}${url}`);
};

// POST
export const postData = (url = "", data) => {
  return axios.post(`${BASE_URL}${url}`, data);
};

// PUT
export const putData = (url = "", data) => {
  return axios.put(`${BASE_URL}${url}`, data);
};

// DELETE
export const deleteData = (url = "") => {
  return axios.delete(`${BASE_URL}${url}`);
};

// Upload Image
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axios.post(
    "https://httpbin.org/post",
    formData
  );
};