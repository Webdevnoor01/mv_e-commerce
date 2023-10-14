/* eslint-disable react/prop-types */
import InputGroup from '..';

const SearchableSelect = ({
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
  showSearch,
  searchValue,
  options,
  selectedOption,
  setSearchValue,
  handleShowSearch,
  handleSearchOption,
  handleSelectOption,
  error
}) => {
  return (
    <div className="flex flex-col w-full gap-1 mb-3 relative ">
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
        value={value}
        onClick={handleShowSearch}
        onBlur={onBlur}
        readOnly
      />
      {error && <p className="text-xs text-[#CA0F0F] font-semibold ">{error}</p>}
      <div
        className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
          showSearch ? 'scale-100' : 'scale-0'
        } `}
      >
        <div className="w-full px-4 py-2 fixed mb-3 ">
          <InputGroup
            type={'text'}
            htmlFor={'searchCategory'}
            placeholder={'search category'}
            onChange={handleSearchOption}
            value={searchValue}
          />
        </div>

        <div className="flex justify-start items-center flex-col h-[200px]  mt-14 overflow-y-scroll ">
          {options.map((option) => (
            <span
            key={option.name}
              className={`py-2 px-4 text-white hover:bg-slate-700 w-full cursor-pointer ${
                (searchValue?.toLowerCase() || selectedOption?.toLowerCase())  === option.name.toLowerCase() &&
                'bg-indigo-500 mb-1'
              } `}
              onClick={() => {
                handleSelectOption(option.name);
                handleShowSearch(false);
                setSearchValue('')
                
              }}
            >
              {option.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;
