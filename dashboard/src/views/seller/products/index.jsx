import { useState } from "react";

// custome & reusable components
import Search from "../../../components/search";
import Table from "../../../components/table";
import Pagination from "../../../components/pagination";
import Action from "../../../components/table-action";

// react-icons
import {FaEdit, FaTrash, FaEye } from "react-icons/fa"


const tableOption = {
    thead: ["No", "Image", "Name", "Category", "Brand", "Price", "Discount", "Stock", "Action"],
    tbody: {
      data1: {
        td: [
          1,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className=" h-[100%] "
              src="../../../images/category/1.png"
              alt=""
            />
          </div>,
          ,
          <span> sports </span>,
          <span>T-shirt</span>,
          <span>XYZ</span>,
          <span>1200</span>,
          <span>10%</span>,
          <span>10</span>,
          <span className="flex justify-start items-center gap-1">
            <Action to={"/seller/dashboard/edit-product/1"} Icon={FaEdit} bg={"bg-yellow-500"} shadow={"hover:bg-yellow-500/50"}/>
            <Action Icon={FaTrash} bg={"bg-red-500"} shadow={"hover:bg-red-500/50"}/>
            <Action to={"/seller/dashboard/products/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />
          </span>,
        ],
      },
      data2: {
        td: [
          2,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className=" h-[100%] "
              src="../../../images/category/1.png"
              alt=""
            />
          </div>,
          ,
          <span> sports </span>,
          <span>T-shirt</span>,
          <span>XYZ</span>,
          <span>1200</span>,
          <span>10%</span>,
          <span>10</span>,
          <span className="flex justify-start items-center gap-1">
            <Action to={"/seller/dashboard/edit-product/1"} Icon={FaEdit} bg={"bg-yellow-500"} shadow={"hover:bg-yellow-500/50"}/>
            <Action Icon={FaTrash} bg={"bg-red-500"} shadow={"hover:bg-red-500/50"} />
            <Action to={"/seller/dashboard/products/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />

          </span>,
        ],
      },
      data3: {
        td: [
          3,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className=" h-[100%] "
              src="../../../images/category/1.png"
              alt=""
            />
          </div>,
          ,
          <span> sports </span>,
          <span>T-shirt</span>,
          <span>XYZ</span>,
          <span>1200</span>,
          <span>10%</span>,
          <span>10</span>,
          <span className="flex justify-start items-center gap-1">
            <Action to={"/seller/dashboard/edit-product/1"} Icon={FaEdit} bg={"bg-yellow-500"} shadow={"hover:bg-yellow-500/50"}  />
            <Action Icon={FaTrash} bg={"bg-red-500"} shadow={"hover:bg-red-500/50"} />
            <Action to={"/seller/dashboard/products/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />
          </span>,
        ],
      },
      
    },
  };

const Products = () => {
  const [parPage, setParPage] = useState(5);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const selectOptions = [
    {
      value: 5,
      text: 5,
    },
    {
      value: 10,
      text: 10,
    },
    {
      value: 20,
      text: 20,
    },
  ];

  const handleSelect = (e) => {
    setParPage(e.target.value);
  };

  return (
    <div className="px-2 lg:px-7 py-4">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          selectOptions={selectOptions}
          parPage={parPage}
          handleSelect={handleSelect}
          setSearch={setSearch}
        />

        <div className="w-full text-sm text-left text-[#d0d2d6]">
          <Table thead={tableOption.thead} tbodys={tableOption.tbody} />
        </div>
        <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={50}
            parPage={parPage}
            showItems={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
