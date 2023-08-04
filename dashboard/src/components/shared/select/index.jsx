import React from "react";
import InputGroup from "../Input-group";

const Select = ({
  options,
  name,
  value,
  onChange,
  fullWidth,
  label,
  search,
}) => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-3">
        {label && (
          <label htmlFor={name} className="text-[#d0d2d6]  ">
            {" "}
            {label}{" "}
          </label>
        )}
        <select
          className={`px-4 py-2 focus:border-indigo-500 bg-[#283046] outline-none border border-slate-700 rounded-md text-[#d0d2d6] cursor-pointer ${
            fullWidth && "w-full"
          }`}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
