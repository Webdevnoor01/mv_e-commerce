import React from "react";

// router
import { Navigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

const Home = () => {
  const { role } = useSelector(state => state.auth)

  if(role === "admin") return <Navigate to={"/admin/dashboard"} replace />
  else if(role === "seller") return <Navigate to={"/seller/dashboard"} replace />
  else return <Navigate to={"/login"} replace />
};

export default Home;
