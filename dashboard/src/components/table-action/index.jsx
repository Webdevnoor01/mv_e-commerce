import React from "react";
import { Link } from "react-router-dom";

const Action = ({ to, Icon, title, handleClick, bg, shadow }) => {
  return (
    <Link
      to={to}
      className={`flex justify-center items-center p-[6px] rounded-md ${bg}`}
    >
      {Icon && <Icon />}
      {title && title}
    </Link>
  );
};

export default Action;
