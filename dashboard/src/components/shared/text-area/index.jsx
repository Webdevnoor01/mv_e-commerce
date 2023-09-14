import React from "react";

const TextArea = ({
  lable,
  name,
  placeholder,
  onChange,
  onClick,
  onBlur,
  value,
  textAreaRef,
  isActive,
  height,
  error
}) => {
  return (
    <div className="flex flex-col w-full gap-1 mb-3">
      {lable && <label htmlFor={name} className="text-[#d0d2d6]" >{lable}</label>}
      <textarea
        ref={isActive ? textAreaRef : null}
        className={`px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden ${height && height} `}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onClick={onClick}
        onBlur={onBlur}
      ></textarea>
      {error && <p className="text-xs text-[#CA0F0F] font-semibold ">{error}</p>}
    </div>
  );
};

export default TextArea;
