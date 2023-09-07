import { Suspense, lazy } from "react";

const Home = lazy(() => import("../../views/pages/home"));
import AdminLogin from "../../views/auth/admin";
const Login = lazy(() => import("../../views/auth/login"));
const Register = lazy(() => import("../../views/auth/signup"));
const UnAuthorized = lazy(() => import("../../views/pages/unauthorized"));

const publicRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <Home />
      </Suspense>
    ),
  },
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
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <UnAuthorized />
      </Suspense>
    ),
  },
];
export default publicRoutes;
