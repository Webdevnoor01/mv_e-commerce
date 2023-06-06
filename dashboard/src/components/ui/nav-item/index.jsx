import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ currentPath, to, title, icon }) => {
  return (
    <li>
      <Link
        to={to}
        className={`${
          currentPath === to
            ? "bg-slate-600 shadow-indgo-500/30 text-white duration-500"
            : "text-[#d0d2d6] font-normal duration-200 "
        } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}
      >
        <span> {icon} </span>
        <span> {title} </span>
      </Link>
    </li>
  );
};

export default NavItem;
