import React from "react";
import { FaList } from "react-icons/fa";
const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="bg-[#161d31] fixed top-0 left-0 py-5 px-2 lg:px-7 z-40 w-full ">
      <div className=" ml-0 lg:ml-[16.25rem] rounded-sm h-[4.0625rem] flex justify-between items-center bg-[#283046] px-5 transition-all  ">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[2.1875rem] h-[2.1875rem] rounded-sm bg-indigo-500 shadow-indigo-500/50 text-white flex justify-center items-center cursor-pointer lg:hidden "
        >
          <span>
            {" "}
            <FaList />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
