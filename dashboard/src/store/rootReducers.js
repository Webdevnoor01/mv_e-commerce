import authSlice from "./Reducers/authSlice"
import categorySlce from "./Reducers/categorySlice"
import productSlice from "./Reducers/productSlice"

const rootReducer = {
    auth: authSlice,
    category:categorySlce,
    product:productSlice
}

export default rootReducer