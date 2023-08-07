import { Suspense, lazy } from "react"

const Home = lazy(() => import("../../views/pages/home"))
const SellerDashboard = lazy(() => import("../../views/seller/dashboard"))
const AddProduct = lazy(() => import("../../views/seller/add-product"))
const Products = lazy(() => import("../../views/seller/products"))
const DiscountProducts = lazy(() => import("../../views/seller/discount-products"))
const Orders = lazy(() => import("../../views/seller/orders"))
const Payments = lazy(() => import("../../views/seller/payments"))
const SellerAdminChat = lazy(() => import("../../views/seller/seller-admin-chat"))
const SellerCustomerChat = lazy(() => import("../../views/seller/seller-customer-chat"))
const Profile = lazy(() => import("../../views/seller/profile"))
const EditProduct = lazy(() => import("../../views/seller/edit-product"))

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
        role:"seller",
        status:"active"
    },
    {
        path:"/seller/dashboard/add-product",
        element:<Suspense fallback="Loading..." >
            <AddProduct />
        </Suspense>,
        role:"seller",
        status:"active"
    },
    {
        path:"/seller/dashboard/edit-product/:productId",
        element:<Suspense fallback="Loading..." >
            <EditProduct />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/products",
        element:<Suspense fallback="Loading..." >
            <Products />
        </Suspense>,
        role:"seller",
        status:"active"
    },
    {
        path:"/seller/dashboard/discount-products",
        element:<Suspense fallback="Loading..." >
            <DiscountProducts />
        </Suspense>,
        role:"seller",
        status:"active"
    },
    {
        path:"/seller/dashboard/orders",
        element:<Suspense fallback="Loading..." >
            <Orders />
        </Suspense>,
        role:"seller",
        ability:[ "active", "deactive"]
    },
    {
        path:"/seller/dashboard/payments",
        element:<Suspense fallback="Loading..." >
            <Payments />
        </Suspense>,
        role:"seller",
        status:"active"
    },
    {
        path:"/seller/dashboard/chat-sellers",
        element:<Suspense fallback="Loading..." >
            <SellerCustomerChat />
        </Suspense>,
        role:"seller",
        ability:[ "active", "deactive", "pending"]
    },
    {
        path:"/seller/dashboard/chat-sellers/:customerId",
        element:<Suspense fallback="Loading..." >
            <SellerCustomerChat />
        </Suspense>,
        role:"seller",
        ability:[ "active", "deactive", "pending"]
    },
    {
        path:"/seller/dashboard/chat-support",
        element:<Suspense fallback="Loading..." >
            <SellerAdminChat />
        </Suspense>,
        ability:[ "seller"]
    },
    {
        path:"/seller/dashboard/profile",
        element:<Suspense fallback="Loading..." >
            <Profile />
        </Suspense>,
        ability:[ "seller"]
    },
    
]