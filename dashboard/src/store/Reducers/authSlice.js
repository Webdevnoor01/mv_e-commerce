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
      const adminInfo = await api.post("/auth/admin/login", payload, {
        withCredentials: true,
      });
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
      if (sellerInfo.data.token) {
        localStorage.setItem("accessToken", sellerInfo.data.token);
      }
      return fulfillWithValue(sellerInfo.data);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const logout = createAsyncThunk("logout", async (_, {fulfillWithValue, rejectWithValue}) => {
  try {
    
    const response = await api.get("/auth/logout", {
      withCredentials:true
    })
    return fulfillWithValue(response.data)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
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
      const userInfo = await api.get("/auth/get-user",{
        withCredentials:true,
      });
      // localStorage.setItem("accessToken", userInfo?.data?.token);
      return fulfillWithValue(userInfo.data);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    let decodeToken = jwt(token);
    console.log(decodeToken);
    const expireTime = new Date(decodeToken.exp * 1000).getTime();
    if (new Date().getTime() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

// upload user image
export const sellerImageUpload = createAsyncThunk(
  "seller/image-upload",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("userImage", payload.image[0]);

    try {
      const response = await api.patch(
        `/seller/profile-image-upload/${payload.userId}`,
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

// upload seller shop info
export const sellerShopInfoUpload = createAsyncThunk(
  "seller/shop-info-upload",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    const formData = new FormData();
    Object.keys(payload.data).map((key) => {
      formData.append(key, payload.data[key]);
    });
    try {
      const response = await api.patch(
        `/seller/shop-info-upload/${payload.userId}`,
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loading: false,
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
    userInfo: {},
  },
  reducers: {
    resetMessages: (state) => {
      (state.errorMessage = ""), (state.successMessage = "");
    },
    resetToken: (state) => {
      state.token = "";
      state.userInfo = {};
      state.role = "";
    }
  },
  extraReducers: {
    // admin login
    [adminLogin.pending]: (state) => {
      state.loading = true;
    },
    [adminLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.user.role;

      state.successMessage = action.payload.message;
      state.userInfo = action.payload.user;
      state.loading = false;
    },
    [adminLogin.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },

    // seller register
    [sellerRegister.pending]: (state) => {
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
    [sellerLogin.pending]: (state) => {
      state.loading = true;
    },
    [sellerLogin.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.user.role;

      state.successMessage = action.payload.message;
      state.userInfo = action.payload.user;
      state.loading = false;
    },
    [sellerLogin.rejected]: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
    // logout
    [logout.fulfilled]:(state, action) => {
      console.log(action.payload.message)
    },
    // get use info
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
    },
    [getUserInfo.rejected]: (state, action) => {
      console.log(action.payload);
    },

    // seller profile image upload
    [sellerImageUpload.pending]: (state) => {
      state.loading = true;
    },
    [sellerImageUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload?.message;
    },
    [sellerImageUpload.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload?.message;
    },

    // seller shop info upload
    [sellerShopInfoUpload.pending]: (state) => {
      state.loading = true;
    },
    [sellerShopInfoUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload?.message;
      state.userInfo.shopInfo = action.payload?.shopInfo;
    },
    [sellerShopInfoUpload.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload?.message;
    },
  },
});
export const { resetMessages, resetToken } = authSlice.actions;
export default authSlice.reducer;
