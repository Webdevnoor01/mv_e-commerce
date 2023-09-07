import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

import jwt from "jwt-decode";

/**
 *@param { object} payload paylod should be an object
 */
export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const adminInfo = await api.post("/admin/login", payload, {
        withCredentials: true,
      });
      console.log("data", adminInfo.data);
      if (adminInfo.data.token) {
        localStorage.setItem("accessToken", adminInfo.data.token);
      }
      return fulfillWithValue(adminInfo.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const sellerLogin = createAsyncThunk(
  "auth/seller-login",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const sellerInfo = await api.post("/auth/seller/login", payload, {
        withCredentials: true,
      });
      console.log("data", sellerInfo.data);
      if (sellerInfo.data.token) {
        localStorage.setItem("accessToken", sellerInfo.data.token);
      }
      return fulfillWithValue(sellerInfo.data);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const sellerRegister = createAsyncThunk(
  "auth/seller-register",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/auth/seller/register", payload, {
        withCredentials: true,
      });
      console.log("data", response.data);
      // localStorage.setItem('accessToken', response.token)
      return fulfillWithValue(response.data);
    } catch (e) {
      return rejectWithValue(e.response.data.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/get-user",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await api.get("/auth/get-user", {
        withCredentials: true,
      });
      // localStorage.setItem("accessToken", userInfo?.data?.token);
      return fulfillWithValue(userInfo.data);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const returnRole =  (token) => {
  if (token) {
    let decodeToken =  jwt(token);
    console.log(decodeToken);
    const expireTime = new Date(decodeToken.exp * 1000).getTime()
    console.log(new Date().getTime(), expireTime);
    if (new Date().getTime() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      console.log("returning role ", decodeToken.role)
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

console.log("returnRole ", returnRole(localStorage.getItem('accessToken')))
const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    role:  returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
    userInfo: {},
  },
  reducers: {
    resetMessages: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
  },
  extraReducers: {
    // admin login
    [adminLogin.pending]: (state) => {
      state.loading = true;
    },
    [adminLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;

      state.successMessage = action.payload.message;
      state.userInfo = action.payload.user;
      state.loading = false;
    },
    [adminLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },

    // seller register
    [sellerRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [sellerRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.userInfo = action.payload.user;
    },
    [sellerRegister.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },

    // seller login
    [sellerLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [sellerLogin.fulfilled]: (state, action) => {
      state.loading = false;

      state.successMessage = action.payload.message;
      state.userInfo = action.payload.user;
    },
    [sellerLogin.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },

    // get use info

    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
    },
    [getUserInfo.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});
export const { resetMessages } = authSlice.actions;
export default authSlice.reducer;
