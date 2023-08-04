import React, { useState } from "react";
import { Link } from "react-router-dom";

const Button = ({
  btnTxt,
  type,
  btnHandler,
  customeClass,
  IconLoading,
  isLoading,
  to,
}) => {
  return (
    <>
      {to && (
        <Link
          to={to}
          className={`${
            customeClass
              ? ` bg-blue-500 hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center ${customeClass} `
              : "bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center"
          }`}
        >
          {" "}
          {btnTxt}
        </Link>
      )}
      {!to && (
        <button
          className={`${
            customeClass
              ? `${customeClass} bg-blue-500 hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center `
              : "bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center"
          }`}
          type={type ? type : "button"}
          disabled={isLoading}
          onClick={btnHandler}
        >
          {isLoading ? IconLoading : btnTxt}
        </button>
      )}
    </>
  );
};

export default Button;
