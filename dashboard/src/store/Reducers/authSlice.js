import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

/**
 *@param { object} payload paylod should be an object
 */
export const adminLogin = createAsyncThunk("auth/admin-login",async (payload) =>{
console.log("authSlice: ", payload)
    try {
        const { data } = await api.post("/admin/login", payload, {
            withCredentials:true
        })
        return data
    } catch (e) {
        console.log("authReducer:ERROR->", e.response.data.message)
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        successMessage:'',
        errorMessage:'',
        loading:false,
        userInfo:{}
    },
    reducers:{

    },
    extraReducers:{

    }
})

export default authSlice.reducer