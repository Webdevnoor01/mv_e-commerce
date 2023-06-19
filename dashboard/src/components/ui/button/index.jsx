import React, { useState } from "react";

const Button = ({
  btnTxt,
  type,
  btnHandler,
  customeClass,
  IconLoading,
  isLoading,
}) => {
  return (
    <button
      className={`${
        customeClass
          ? `${customeClass} bg-blue-500 hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex justify-center items-center `
          : "bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex justify-center items-center"
      }`}
      type={type ? type : "button"}
      disabled={isLoading}
      onClick={btnHandler}
    >
      {isLoading ? IconLoading : btnTxt}
    </button>
  );
};

export default Button;
