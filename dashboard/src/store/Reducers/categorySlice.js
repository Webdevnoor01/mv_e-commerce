import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// import jwt from 'jwt-decode';

/**
 *@param { object} payload paylod should be an object
 */

//  add category into the database
export const addCategoryIntoDB = createAsyncThunk(
  'admin/category-add',
  async ({categoryName, image}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('categoryName', categoryName)
      formData.append('image', image)
      const category = await api.post('/admin/category-add', formData, {
        withCredentials: true,
      });
      
      console.log('data-> ', category.data)
      return fulfillWithValue(category.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);


export const getCategoryFromDB = createAsyncThunk(
  'admin/category-get',
  async ({page, parPage, searchValue}, { rejectWithValue, fulfillWithValue }) => {
    try {
 
      const category = await api.get(`/admin/category-get?page=${page}&&parPage=${parPage}&&searchValue=${searchValue}`, {
        withCredentials: true,
      });
      
      console.log('data-> ', category.data)
      return fulfillWithValue(category.data);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);


const categorySlice = createSlice({
  name: 'category',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
   categories:[],
   totalCategory:0
  },
  reducers: {
    resetCategoryMessages: (state) => {
      (state.errorMessage = ''), (state.successMessage = '');
    },
  },
  extraReducers: {
    // add category
    [addCategoryIntoDB.pending]: (state) => {
      state.loading = true;
    },
    [addCategoryIntoDB.fulfilled]: (state, action) => {

      state.successMessage = action.payload.message;
      state.categories = [...state.categories, action.payload.category];
      state.loading = false;
    },
    [addCategoryIntoDB.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.message;
    },


    // get category
    [getCategoryFromDB.fulfilled]:(state, action) => {
      state.totalCategory = action.payload.totalCategory;
      state.categories = action.payload.categories

    }
  },
});
export const { resetCategoryMessages } = categorySlice.actions;
export default categorySlice.reducer;
