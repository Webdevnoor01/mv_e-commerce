import React from "react";
import { Link } from "react-router-dom";

const Action = ({ to, Icon, title, handleClick, bg, shadow }) => {
  return (
    <>
      {to && (
        <Link
          to={to}
          className={`flex justify-center items-center p-[6px] rounded-md hover:shadow-lg ${bg} ${shadow}`}
        >
          {Icon && <Icon />}
          {title && title}
        </Link>
      )}

      {!to && (
        <button
          className={`flex justify-center items-center p-[6px] rounded-md hover:shadow-lg ${bg} ${shadow} border-none outline-none`}
          onClick={handleClick}
        >
          {" "}
          {Icon && <Icon />}
          {title && title}{" "}
        </button>
      )}
    </>
  );
};

export default Action;
