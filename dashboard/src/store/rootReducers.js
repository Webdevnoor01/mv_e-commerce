import authSlice from "./Reducers/authSlice"
import categorySlce from "./Reducers/categorySlice"
import productSlice from "./Reducers/productSlice"
import sellerSlice from "./Reducers/sellerSlice"

const rootReducer = {
    auth: authSlice,
    category:categorySlce,
    product:productSlice,
    seller:sellerSlice
}

export default rootReducer