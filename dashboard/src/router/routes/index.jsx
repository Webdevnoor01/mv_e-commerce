import { privetRoutes } from "./privetRoutes";

import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

export const getRoutes = () => {
  privetRoutes.map((r) => {
    r.element = <ProtectedRoute route={r} >
      {
        r.element
      }
    </ProtectedRoute>
  })
  return {
    path: "/",
    element: <MainLayout />,
    children: privetRoutes,
  };
};
