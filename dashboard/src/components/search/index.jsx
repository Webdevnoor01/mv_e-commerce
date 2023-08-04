import React, { useState } from "react";
import InputGroup from "../shared/Input-group";
import Select from "../shared/select"
const Search = ({ selectOptions, parPage, handleSelect, setSearch }) => {
    const [searchValue, setSearchValue] = useState("")
    const handleSearch = (e) =>{
        setSearch(e.target.value)
        setSearchValue(e.target.value)
    }
  return (
    <div className="flex justify-between items-center">
      <Select
        options={selectOptions}
        name={"parPage"}
        value={parPage}
        onChange={handleSelect}
      />
      <div className="w-3/12">
        <InputGroup
          type={"text"}
          placeholder={"search..."}
          htmlFor={"search"}
          onChange={handleSearch}
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default Search;
