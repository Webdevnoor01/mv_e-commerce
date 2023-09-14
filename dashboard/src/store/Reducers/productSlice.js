import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";


import jwt from "jwt-decode";

/**
 *@param { object} payload paylod should be an object
 */

//  add category into the database
export const addProductIntoDB = createAsyncThunk(
  "seller/product-add",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
        console.log("payload: ", payload)
      const category = await api.post("/seller/product-add", payload, {
        withCredentials: true,
      });
      
      console.log("data-> ", category.data)
      return fulfillWithValue(category.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);


export const getProductFromDB = createAsyncThunk(
  "seller/product-get",
  async ({page, parPage, searchValue}, { rejectWithValue, fulfillWithValue }) => {
    try {
 
      const products = await api.get(`/seller/product-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`, {
        withCredentials: true,
      });
      
      return fulfillWithValue(products.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    products:[],
   totalProducts:0
  },
  reducers: {
    resetProductMessages: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
  },
  extraReducers: {
    // add category
    [addProductIntoDB.pending]: (state) => {
      state.loading = true;
    },
    [addProductIntoDB.fulfilled]: (state, action) => {

      state.successMessage = action.payload.message;
      state.loading = false;
    },
    [addProductIntoDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },


    // get category
    [getProductFromDB.fulfilled]:(state, action) => {
      state.totalProducts = action.payload.totalProducts;
      state.products = action.payload.products

    }
  },
});
export const { resetProductMessages } = productSlice.actions;
export default productSlice.reducer;
