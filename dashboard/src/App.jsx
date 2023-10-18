// react
import { useEffect, useState } from "react";
import "./App.css";

// redux
import { useDispatch, useSelector } from "react-redux";

// Public Routes
import publicRoutes from "./router/routes/publicRoutes";

// Router Components
import Router from "./router/routes/Router";
import { getRoutes } from "./router/routes";
import { getUserInfo } from "./store/Reducers/authSlice";

function App() {
  // const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prevRoutes) => [...prevRoutes, routes]);
  }, []);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    console.log("token -> ", token);
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token]);
  return <Router allRoutes={allRoutes} />;
}

export default App;
