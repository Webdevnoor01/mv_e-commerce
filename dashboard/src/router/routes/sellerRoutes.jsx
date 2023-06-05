import { Suspense, lazy } from "react"

const Home = lazy(() => import("../../views/pages/home"))

export const sellerRoutes = [
    {
        path:"/",
        element:<Suspense fallback="Loading..." >
            <Home />
        </Suspense>,
        ability:["admin", "seller"]
    }
]