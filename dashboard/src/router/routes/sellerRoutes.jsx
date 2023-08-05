import { Suspense, lazy } from "react"
import ChatSeller from "../../views/seller/chat-seller"

const Home = lazy(() => import("../../views/pages/home"))
const SellerDashboard = lazy(() => import("../../views/seller/dashboard"))
const AddProduct = lazy(() => import("../../views/seller/add-product"))
const Products = lazy(() => import("../../views/seller/products"))
const DiscountProducts = lazy(() => import("../../views/seller/discount-products"))
const Orders = lazy(() => import("../../views/seller/orders"))
const Payments = lazy(() => import("../../views/seller/payments"))

export const sellerRoutes = [
    {
        path:"/",
        element:<Suspense fallback="Loading..." >
            <Home />
        </Suspense>,
        ability:["admin", "seller"]
    },
    {
        path:"/seller/dashboard",
        element:<Suspense fallback="Loading..." >
            <SellerDashboard />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/chat-sellers",
        element:<Suspense fallback="Loading..." >
            <ChatSeller />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/add-product",
        element:<Suspense fallback="Loading..." >
            <AddProduct />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/products",
        element:<Suspense fallback="Loading..." >
            <Products />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/discount-products",
        element:<Suspense fallback="Loading..." >
            <DiscountProducts />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/orders",
        element:<Suspense fallback="Loading..." >
            <Orders />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/payments",
        element:<Suspense fallback="Loading..." >
            <Payments />
        </Suspense>,
        ability:[ "seller"]
    },
]