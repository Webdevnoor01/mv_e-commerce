import { Suspense, lazy } from "react";
import Category from "../../views/admin/category"; 

const AdminDashboard = lazy(() => import("../../views/admin/dashboard"));
const Orders = lazy(() => import("../../views/admin/orders"));
const Sellers = lazy(() => import("../../views/admin/sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/payment-request"));
const DeActiveSellers = lazy(() => import("../../views/admin/deactive-sellers"));
const SellerRequests = lazy(() => import("../../views/admin/seller-requests"));
const SellerDetails = lazy(() => import("../../views/admin/seller-details"));
const SellersChat = lazy(() => import("../../views/admin/sellers-chat"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: (
      <Suspense fallback="Loading...">
        <AdminDashboard />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: (
      <Suspense fallback="Loading...">
        <Orders />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: (
      <Suspense fallback="Loading...">
        <Category />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: (
      <Suspense fallback="Loading...">
        <Sellers />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: (
      <Suspense fallback="Loading...">
        <PaymentRequest />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/deactive-sellers",
    element: (
      <Suspense fallback="Loading...">
        <DeActiveSellers />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/seller-requests",
    element: (
      <Suspense fallback="Loading...">
        <SellerRequests />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/seller/details/:sellerId",
    element: (
      <Suspense fallback="Loading...">
        <SellerDetails />
      </Suspense>
    ),
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers-chat",
    element: (
      <Suspense fallback="Loading...">
        <SellersChat />
      </Suspense>
    ),
    role: "admin",
  },
];
