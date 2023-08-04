import React from "react";

const InputGroup = ({
  lable,
  htmlFor,
  type,
  placeholder,
  onChange,
  onClick,
  onBlur,
  value,
  inputRef,
  isActive,
  hidden,
}) => {
  return (
    <div className="flex flex-col w-full gap-1 mb-3">
      {lable && <label htmlFor={htmlFor} className="text-[#d0d2d6]" >{lable}</label>}
      <input
        ref={isActive ? inputRef : null}
        className={`px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden ${
          hidden && "hidden"
        }`}
        type={type}
        name={htmlFor}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onClick={onClick}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputGroup;
