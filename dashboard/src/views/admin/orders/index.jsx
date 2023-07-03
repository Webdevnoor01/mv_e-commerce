import { useState } from "react";

// react-icons
import { BsArrowBarDown } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

// components
import InputGroup from "../../../components/shared/Input-group";
import Table from "../../../components/table";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination";
import Action from "../../../components/table-action";
import Select from "../../../components/shared/select"
import shortid from "shortid";

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
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} />
          </span>
          ,
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
         <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} />
          </span>,
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
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} />
          </span>,
          <div className="cursor-pointer">
            <BsArrowBarDown />
          </div>,
        ],
      },
    },
  };

  const pageNumSelectOpt = [
    {
      id:shortid.generate(),
      value:5,
      text:5
    },
    {
      id:shortid.generate(),
      value:10,
      text:10
    },
    {
      id:shortid.generate(),
      value:20,
      text:20
    },
  ]

  const handlePageNum = (e) => {
    setParPage(e.target.value)
  }
  return (
    <div className="px-2 lg:px-7 pt-45">
      <div className="w-full p-4 bg-[#283046] rounded-md ">
        <div className="flex justify-between items-center">
         <Select options={pageNumSelectOpt} name={"parPage"} value={parPage} onChange={handlePageNum} />
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
            pageNumber={50}
            parPage={parPage}
            showItems={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
