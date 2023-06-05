import { useEffect, useState } from "react";
import "./App.css";

// Public Routes
import publicRoutes from "./router/routes/publicRoutes";

// Router Components
import Router from "./router/routes/Router";
import { getRoutes } from "./router/routes";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prevRoutes) => [...prevRoutes, routes]);
  }, []);
  console.log("allRoutes: ", allRoutes);
  return <Router allRoutes={allRoutes} />;
}

export default App;
