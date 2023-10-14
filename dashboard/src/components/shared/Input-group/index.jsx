/* eslint-disable react/prop-types */

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
  error,
}) => {
  return (
    <>
      <div className="flex flex-col w-full gap-1 mb-3">
        {lable && (
          <label htmlFor={htmlFor} className="text-[#d0d2d6]">
            {lable}
          </label>
        )}
        <input
          ref={isActive ? inputRef : null}
          className={`px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden ${
            hidden && 'hidden'
          }`}
          type={type}
          name={htmlFor}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          value={value}
          min={0}
        />
      {error && <p className="text-xs text-[#CA0F0F] font-semibold ">{error}</p>}
      </div>
    </>
  );
};

export default InputGroup;
