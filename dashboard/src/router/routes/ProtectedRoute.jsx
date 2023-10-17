/* eslint-disable react/prop-types */
import { Suspense } from "react";

// react-reudx
import { useSelector } from "react-redux";

// react-router-dom
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    if (userInfo) {
      if (route.role) {
        if (role === route.role) {
          if (route.status) {
            if (userInfo.status === route.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === "pending") {
                return <Navigate to={"/seller/account-pending"} replace />;
              } 
              
              if(userInfo.status === "deactive"){
                return <Navigate to={"/seller/account-deactive"} replace />;
              }
            }
          } else {
            if (route.visibiity) {
              if (
                route.visibiity.some((status) => status === userInfo.status)
              ) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to={"/seller/account-pending"} replace />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          console.log(userInfo.role, route.role);
          return <Navigate to={"/unauthorized"} replace />;
        }
      } else {
        if (route.ability === "seller") {
          return <Suspense fallback={null}>{children}</Suspense>;
        }
      }
    }
  } else {
     return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedRoute;
