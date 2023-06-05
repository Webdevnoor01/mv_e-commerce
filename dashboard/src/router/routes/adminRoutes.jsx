import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("../../views/pages/dashboard"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: (
      <Suspense fallback="Loading...">
        <Dashboard />
      </Suspense>
    ),
    role: "admin",
  },
];
