import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// get single inactive seller form the database
export const getActiveSellersFromDB = createAsyncThunk(
  "admim/get-active-sellers",
  async (
    { page, parPage, searchValue },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `/admin/active-sellers-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// TODO: incomplete work
// get single inactive seller form the database
export const getActiveSellerFromDB = createAsyncThunk(
  "admim/get-inactive-seller",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/active-seller-get/${payload.sellerId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get all inactive seller from the database
export const getSellerRequestsFromDB = createAsyncThunk(
  "admin/seller-requests-get",
  async (
    { page, parPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `/admin/inactive-sellers-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);
// get single inactive seller form the database
export const getInactiveSellerFromDB = createAsyncThunk(
  "admim/get-inactive-seller",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/inactive-seller-get/${payload.sellerId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update seller account status
export const updateSellerAccountStatus = createAsyncThunk(
  "admin/seller-account-status-update",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    const formData = new FormData();
    Object.keys(payload).map((key) => {
      formData.append(key, payload[key]);
    });
    try {
      const response = await api.patch(
        "/admin/seller-status-update",
        formData,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    stautsUpdateLoading: false,
    sellers: [],
    inactiveSellers: [],
    deactiveSellers: [],
    totalSeller: 0,
    sellerInfo: {},
  },
  reducers: {
    resetSellersMessages: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
  },
  extraReducers: {
    // get active sellers(all sellers) from the database
    [getActiveSellersFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getActiveSellersFromDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.sellers = action.payload.sellers;
    },
    [getActiveSellersFromDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },
    // get active seller(single seller) from the database
    [getActiveSellerFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getActiveSellerFromDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.sellersInfo = action.payload.sellerInfo;
    },
    [getActiveSellerFromDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },

    // get inactive sellers from the database
    [getSellerRequestsFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getSellerRequestsFromDB.fulfilled]: (state, action) => {
      console.log("payload-> ", action.payload);
      state.inactiveSellers = action.payload.sellers;
      state.loading = false;
    },
    [getSellerRequestsFromDB.rejected]: (state) => {
      state.loading = false;
    },
    // get inactive seller from the database
    [getInactiveSellerFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getInactiveSellerFromDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.sellerInfo = action.payload.sellerInfo;
    },
    [getInactiveSellerFromDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },
    // updae seller account status
    [updateSellerAccountStatus.pending]: (state) => {
      state.stautsUpdateLoading = true;
    },
    [updateSellerAccountStatus.fulfilled]: (state, action) => {
      state.stautsUpdateLoading = false;
      state.successMessage = action.payload.message;
      state.sellerInfo.status = action.payload.status;
    },
    [updateSellerAccountStatus.rejected]: (state, action) => {
      state.stautsUpdateLoading = false;
      state.errorMessage = action.payload.message;
    },
  },
});
export const { resetSellersMessages } = sellerSlice.actions;
export default sellerSlice.reducer;
