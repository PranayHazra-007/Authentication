import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  user: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Store Logged In User
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Logout User
    logoutUser: (state) => {
      state.user = null;
      state.cartItems = [];
    },
    // Add To Cart
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }
    },
    // Remove From Cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    // Increase Quantity
    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    // Decrease Quantity
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  setUser,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  logoutUser
} = cartSlice.actions;

export default cartSlice.reducer;