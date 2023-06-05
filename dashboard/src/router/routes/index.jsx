import { privetRoutes } from "./privetRoutes";

import MainLayout from "../../layout/MainLayout";

export const getRoutes = () => {
  console.log("privetRoutes: ", privetRoutes);
  return {
    path: "/",
    element: <MainLayout />,
    children: privetRoutes,
  };
};
