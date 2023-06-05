import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

/**
 *@param { object} payload paylod should be an object
 */
export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (payload, {rejectWithValue, fulfillWithValue}) => {
    console.log("authSlice: ", payload);
    try {
      const { data } = await api.post("/admin/login", payload, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token)
      return fulfillWithValue(data)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    userInfo: {},
  },
  reducers: {
    resetMessages: (state, action) =>{
        state.errorMessage="",
        state.successMessage=""
    }
  },
  extraReducers: {
    [adminLogin.pending] :(state, action) =>{
        state.loading = true
    },
    [adminLogin.fulfilled] : (state, action) =>{
        state.loading = false,
        state.successMessage = action.payload.message
    },
    [adminLogin.rejected] : (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message
    }
  },
});
export const { resetMessages } = authSlice.actions
export default authSlice.reducer;
