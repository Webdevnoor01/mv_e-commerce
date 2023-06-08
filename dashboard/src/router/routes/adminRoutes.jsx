import { Suspense, lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/dashboard"));

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
];
