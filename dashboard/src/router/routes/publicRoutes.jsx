import { Suspense, lazy } from "react";
import AdminLogin from "../../views/auth/admin";
const Login = lazy(() => import("../../views/auth/login"));
const Register = lazy(() => import("../../views/auth/signup"));
const publicRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <AdminLogin />
      </Suspense>
    ),
  },
];
export default publicRoutes;
