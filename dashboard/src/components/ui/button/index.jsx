/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Button = ({
  btnTxt,
  type,
  btnHandler,
  customeClass,
  IconLoading,
  isLoading,
  to,
  isDisabled
}) => {
  return (
    <>
      {to && (
        <Link
          to={to}
          className={`${
            customeClass.length > 0
              ? `  hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center ${customeClass} `
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
              ? `hover:shadow-lg  text-white rounded-md px-7 py-2  flex justify-center items-center ${customeClass} `
              : "bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2  flex justify-center items-center"
          }`}
          type={type ? type : "button"}
          disabled={isLoading || isDisabled}
          onClick={btnHandler}

        >
          {isLoading ? IconLoading: btnTxt}
        </button>
      )}
    </>
  );
};

export default Button;
