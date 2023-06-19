import { useState } from "react";

// react-icons
import { BsArrowBarDown } from "react-icons/bs";

// components
import InputGroup from "../../../components/shared/Input-group";
import Table from "../../../components/table";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [parPage, setParPage] = useState(10);
  const [isChildShow, setIsChildShow] = useState(false);

  const tableOption = {
    thead: [
      "Order Id",
      "Price",
      "Order Status",
      "payment Status",
      "Action",
      <div className="cursor-pointer">
        <BsArrowBarDown />
      </div>,
    ],
    tbody: {
      data1: {
        td: [
          "#lsdfjdsfalkjfs",
          250,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
          <div
            className="cursor-pointer"
            onClick={() => setIsChildShow(!isChildShow)}
          >
            <BsArrowBarDown />
          </div>,
        ],
        children: {
          data1: [
            "#lsdfjdsfalkjfs",
            250,
            <span> processing </span>,
            <span>Paid</span>,
            "",
            "",
          ],
          data2: [
            "#lsdfjdsfalkjfs",
            250,
            <span> processing </span>,
            <span>Paid</span>,
            "",
            "",
          ],
        },
      },
      data2: {
        td: [
          "#lsdfjdsfalkjfs",
          700,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
          <div className="cursor-pointer">
            <BsArrowBarDown />
          </div>,
        ],
      },
      data3: {
        td: [
          "#lsdfjdsfalkjfs",
          2500,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
          <div className="cursor-pointer">
            <BsArrowBarDown />
          </div>,
        ],
      },
    },
  };
  return (
    <div className="px-2 lg:px-7 pt-45">
      <div className="w-full p-4 bg-[#283046] rounded-md ">
        <div className="flex justify-between items-center">
          <select
            className="px-4 py-2 focus:border-indigo-500 bg-[#283046] outline-none border border-slate-700 rounded-md text-[#d0d2d6] cursor-pointer "
            name="parPage"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <div className="w-3/12">
            <InputGroup type={"text"} placeholder={"search..."} />
          </div>
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <Table
              thead={tableOption.thead}
              tbodys={tableOption.tbody}
              isShow={isChildShow}
            />
          </div>
        </div>
        <div className="flex justify-end items-center mb-1">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumber={500}
            parPage={parPage}
            showItems={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
