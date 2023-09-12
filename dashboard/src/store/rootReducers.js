import authSlice from "./Reducers/authSlice"
import categorySlce from "./Reducers/categorySlice"

const rootReducer = {
    auth: authSlice,
    category:categorySlce
}

export default rootReducer