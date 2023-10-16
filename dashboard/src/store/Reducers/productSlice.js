import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// import jwt from 'jwt-decode';

/**
 *@param { object} payload paylod should be an object
 */

//  add category into the database
export const addProductIntoDB = createAsyncThunk(
  "seller/product-add",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log("payload: ", payload);
      const category = await api.post("/seller/product-add", payload, {
        withCredentials: true,
      });

      console.log("data-> ", category.data);
      return fulfillWithValue(category.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const getProductsFromDB = createAsyncThunk(
  "seller/products-get",
  async (
    { page, parPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const products = await api.get(
        `/seller/products-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(products.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const getProductFromDB = createAsyncThunk(
  "seller/product-get",
  async ({ productId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const products = await api.get(`/seller/product-get/${productId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(products.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateProductIntoDB = createAsyncThunk(
  "seller/product-update",
  async ({ productId, payload }, { rejectWithValue, fulfillWithValue }) => {
    const form = new FormData();
    Object.keys(payload)?.map((key) => {
      form.append(key, payload[key]);
    });
    try {
      const products = await api.patch(
        `/seller/product-update/${productId}`,
        form,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(products.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateProductImageIntoDB = createAsyncThunk(
  "seller/product-update-image",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const form = new FormData();
      if (payload.oldImg?.publicId)
        form.append("publicId", payload.oldImg.publicId);
      if (payload.index) form.append("index", payload.index);
      form.append("newImage", payload.newImg[0]);

      const newImage = await api.patch(
        `/seller/product-update-img/${payload.productId}`,
        form,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(newImage.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProductFromDB = createAsyncThunk("seller/product-delete",async ({productId}, {rejectWithValue, fulfillWithValue}) => {
  try {
    const product = await api.delete(`/seller/product-delete/${productId}`, {
      withCredentials:true
    })

    return fulfillWithValue(product.data)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    editLoading: false,
    deleteLoading:false,
    imageUploadLoading: false,
    products: [],
    product: {},
    totalProducts: 0,
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
    [getProductsFromDB.pending]:(state) => {
      state.loading = true;
    },
    [getProductsFromDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.totalProducts = action.payload.totalProducts;
      state.products = action.payload.products;
    },
    [getProductsFromDB.rejected]:(state, action) => {
      state.loading = false;
      state.errorMessage = action.payload?.message;
    },

    // get single product by product id
    [getProductFromDB.pending]: (state) => {
      state.editLoading = true;
    },
    [getProductFromDB.fulfilled]: (state, action) => {
      state.editLoading = false;
      state.product = action.payload.product;
    },
    [getProductFromDB.rejected]: (state, action) => {
      state.editLoading = false;
      state.errorMessage = action.payload.message;
    },

    // update product into db
    [updateProductIntoDB.pending]: (state) => {
      state.loading = true;
    },
    [updateProductIntoDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    },
    [updateProductIntoDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },

    // update product image
    [updateProductImageIntoDB.pending]: (state) => {
      state.imageUploadLoading = true;
    },
    [updateProductImageIntoDB.fulfilled]: (state, action) => {
      console.log("action.payload ", action.payload);
      state.imageUploadLoading = false;
      state.successMessage = action.payload?.message;
    },
    [updateProductImageIntoDB.rejected]: (state, action) => {
      state.imageUploadLoading = false;
      state.errorMessage = action.payload?.message;
    },

    // delete product from the database
    [deleteProductFromDB.pending]:(state) => {
      state.deleteLoading = true;
    },
    [deleteProductFromDB.fulfilled]:(state, action) => {
      state.deleteLoading = false;
      state.successMessage = action.payload.message
    },
    [deleteProductFromDB.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.errorMessage = action.payload.message;
    }
  },
});
export const { resetProductMessages } = productSlice.actions;
export default productSlice.reducer;
