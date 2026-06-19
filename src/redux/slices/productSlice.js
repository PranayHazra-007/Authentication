import { createSlice } from "@reduxjs/toolkit";
const initialState = {products: []};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    // Store all products
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // Add new product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    // Update product
    updateProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload.id
          ? action.payload
          : item
      );
    },
    // Delete product
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;