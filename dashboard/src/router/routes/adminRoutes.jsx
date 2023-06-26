import { Suspense, lazy } from "react";
import Category from "../../views/admin/category"; 

const AdminDashboard = lazy(() => import("../../views/admin/dashboard"));
const Orders = lazy(() => import("../../views/admin/orders"));
const Sellers = lazy(() => import("../../views/admin/sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/payment-request"));

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
];
