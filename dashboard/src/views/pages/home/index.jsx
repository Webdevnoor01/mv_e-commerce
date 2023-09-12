import React from "react";

// router
import { Navigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

const Home = () => {
  const { role, userInfo } = useSelector((state) => state.auth);

  console.log("user role ", role, userInfo.role);

  if (role === "admin" || userInfo.role === "admin")
    return <Navigate to={"/admin/dashboard"} replace />;
  else if (role === "seller" || userInfo.role === "seller")
    return <Navigate to={"/seller/dashboard"} replace />;
  else {
    console.log("redirecting to login ", role, userInfo.role, !userInfo);

    return <Navigate to={"/login"} replace />;
  }
};

export default Home;
