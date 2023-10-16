import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getSellerRequestsFromDB = createAsyncThunk(
  "admin/seller-requests-get",
  async (
    { page, parPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `/admin/seller-requests-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`,
        {
          withCredentials: true,
        }
      );
     console.log(response.data)
      return fulfillWithValue(response.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

// Update seller account status 
export const updateSellerAccountStatus= createAsyncThunk("admin/seller-account-status-update",async (payload, {fulfillWithValue, rejectWithValue}) => {
  const formData = new FormData()
  Object.keys(payload).map(key => {
    formData.append(key, payload[key])
  })
  try {
    const response = await api.patch("/admin/seller-status-update", formData, {
      withCredentials:true
    })
    return fulfillWithValue(response.data)
  } catch (error) {
    return rejectWithValue(error.message)
  }
 
} )

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    stautsUpdateLoading:false,
    sellers: [],
    requestedSellers: [],
    deactiveSellers: [],
    totalSeller: 0,
  },
  reducers: {
    resetSellersMessages: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
  },
  extraReducers: {
    //    get requested sellers from the database
    [getSellerRequestsFromDB.pending]: (state) => {
      state.loading = true;
    },
    [getSellerRequestsFromDB.fulfilled]: (state, action) => {
      console.log("payload-> ", action.payload);
      state.requestedSellers = action.payload.sellers;
      state.loading = false;
    },
    [getSellerRequestsFromDB.rejected]: (state) => {
      state.loading = false;
    },

    // updae seller account status
    [updateSellerAccountStatus.pending]: (state) => {
      state.stautsUpdateLoading = true;
    },
    [updateSellerAccountStatus.fulfilled]:(state, action) => {
      state.stautsUpdateLoading = false;
      state.successMessage = action.payload.message
    },
    [updateSellerAccountStatus.rejected]:(state, action) => {
      state.stautsUpdateLoading = false;
      state.errorMessage = action.payload.message
    }
  },
});
export const { resetSellersMessages } = sellerSlice.actions;
export default sellerSlice.reducer;
