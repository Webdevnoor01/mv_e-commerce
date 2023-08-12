import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

/**
 *@param { object} payload paylod should be an object
 */
export const adminLogin = createAsyncThunk(
  'auth/admin-login',
  async (payload, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await api.post('/admin/login', payload, {
        withCredentials:true
      });
      console.log('data', response)
      // localStorage.setItem('accessToken', response.token)
      return fulfillWithValue(response)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
  }
);
export const seller_register = createAsyncThunk(
  'auth/seller-register',
  async (payload, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await api.post('/auth/seller/register', payload, {
        withCredentials:true
      });
      console.log('data', response)
      // localStorage.setItem('accessToken', response.token)
      return fulfillWithValue(response)
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    userInfo: {},
  },
  reducers: {
    resetMessages: (state) =>{
        state.errorMessage='',
        state.successMessage=''
    }
  },
  extraReducers: {
    [adminLogin.pending] :(state) =>{
        state.loading = true
    },
    [adminLogin.fulfilled] : (state, action) =>{
        state.loading = false,
        state.successMessage = action.payload.message
    },
    [adminLogin.rejected] : (state, action) => {
      console.log('action: ', action.payload)
        state.loading = false;
        state.errorMessage = action.payload.message
    }
  },
});
export const { resetMessages } = authSlice.actions
export default authSlice.reducer;
