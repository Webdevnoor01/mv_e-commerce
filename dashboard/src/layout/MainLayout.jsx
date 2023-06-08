import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState();
  return (
    <div className="bg-[#161d31] w-full min-h-screen ">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className="ml-0 lg:ml-[16.25rem] pt-[5.9375rem] transition-all ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
