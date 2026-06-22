import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import kanbanReducer from "./slices/kanbanSlice"

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    kanban: kanbanReducer,
  },
});

export default store;