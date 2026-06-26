import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getData,postData,putData,deleteData} from "../../services/api";

// FETCH PRODUCTS

export const fetchProducts = createAsyncThunk("product/fetchProducts",async (_, thunkAPI) => {
    try {
      const response = await getData("");
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ADD PRODUCT

export const addProduct = createAsyncThunk("product/addProduct",async (product, thunkAPI) => {
    try {
      const response = await postData("/add", product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE PRODUCT

export const updateProduct = createAsyncThunk("product/updateProduct",async (product, thunkAPI) => {
    try {
      const response = await putData(`/${product.id}`,product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE PRODUCT

export const deleteProduct = createAsyncThunk("product/deleteProduct",async (id, thunkAPI) => {
    try {
      await deleteData(`/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// SEARCH PRODUCTS
export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (text, thunkAPI) => {
    try {
      const res = await getData(`/search?q=${text}`);
      return res.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// CATEGORY PRODUCTS
export const categoryProducts = createAsyncThunk(
  "product/categoryProducts",
  async (category, thunkAPI) => {
    try {
      const res = await getData(`/category/${category}`);
      return res.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// FETCH CATEGORIES
export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const res = await getData("/categories");

      console.log("API Response:", res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// INITIAL STATE

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

// SLICE

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        );
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // SEARCH PRODUCTS
      .addCase(searchProducts.pending, (state) => {
      state.loading = true;
     })

     .addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
     })

    .addCase(searchProducts.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload;
     })
// CATEGORY PRODUCTS
     .addCase(categoryProducts.pending, (state) => {
      state.loading = true;
     })

     .addCase(categoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
     })

    .addCase(categoryProducts.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload;
    })

//  FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
       state.loading = true;
       state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
       state.loading = false;
       state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      })

      
  },
});

export default productSlice.reducer;