import React from "react";

const Select = ({options,name,  value, onChange}) => { 
  console.log("options: ", options)
  return (
    <select
      className="px-4 py-2 focus:border-indigo-500 bg-[#283046] outline-none border border-slate-700 rounded-md text-[#d0d2d6] cursor-pointer "
      name={name}
      value={value}
      onChange={onChange}
    >
      {
        options.map((option) => (
            <option key={option.id} value={option.value}> {option.text} </option>
        ))
      }
    </select>
  );
};

export default Select;
