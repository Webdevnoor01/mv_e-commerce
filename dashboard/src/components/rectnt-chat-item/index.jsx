import React from "react";
import { Link } from "react-router-dom";

const RecentChatItem = ({ userImg, userName, time, message }) => {
  return (
    <li className="mb-3 ml-6">
      <div className="flex absolute -left-5 w-10 h-10 justify-center items-center bg-[#00d1e848] p-[6px] rounded-full z-10">
        <img
          src={userImg}
          alt="User logo"
          className="w-full h-full rounded-full shadow-lg  "
        />
      </div>
      <div className="p-3 rounded-lg bg-slate-800 shadow-sm border-slate-600 ">
        <div className="flex justify-between items-center mb-2">
          <Link className="text-md font-normal">{userName}</Link>
          <time className="mb-1 text-sm font-normal md:mb-0 sm:order-last">
            {time}
          </time>
        </div>
        <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border-slate-800">
          {message}
        </div>
      </div>
    </li>
  );
};

export default RecentChatItem;
