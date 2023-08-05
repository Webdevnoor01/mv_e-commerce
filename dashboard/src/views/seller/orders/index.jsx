import React, { useState } from "react";


// custome & reusable option
import Search from "../../../components/search";
import Table from "../../../components/table";
import Pagination from "../../../components/pagination";
import Action from "../../../components/table-action";

// react-icons
import { FaEye } from "react-icons/fa"

// We get the below table option from the database when we intigrate our backend api
const tableOption = {
    thead: ["Order Id", "Price", "Payment Status", "Order Status", "Action"],
    tbody: {
      data1: {
        td: [
          "#sladkfj34wer",
          <span>$1200</span>,
          <span> Pending </span>,
          <span>Processing</span>,
          <span className="flex justify-start items-center gap-1">
            <Action to={"/seller/dashboard/order/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />
          </span>,
        ],
      },
      data2: {
        td: [
            "#sladkfj34wer",
            <span>$1200</span>,
            <span> Pending </span>,
            <span>Processing</span>,
            <span className="flex justify-start items-center gap-1">
              <Action to={"/seller/dashboard/order/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />
            </span>,
          ],
      },
      data3: {
        td: [
            "#sladkfj34wer",
            <span>$1200</span>,
            <span> Pending </span>,
            <span>Processing</span>,
            <span className="flex justify-start items-center gap-1">
              <Action to={"/seller/dashboard/order/1"} Icon={FaEye} bg={"bg-green-500"} shadow={"hover:bg-green-500/50"}  />
            </span>,
          ],
      },
      
    },
  };
const Orders = () => {
  const [parPage, setParPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div className="px-2 lg:px-7 py-4">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search  />
        <Table thead={tableOption.thead} tbodys={tableOption.tbody} />
        <Pagination parPage={parPage} currentPage={currentPage}  />
      </div>
    </div>
  );
};

export default Orders;
