import React, { useState } from "react";

// React icons
import { FaEye } from "react-icons/fa";

// components
import Table from "../../../components/table";
import InputGroup from "../../../components/shared/Input-group";
import Action from "../../../components/table-action";
import Pagination from "../../../components/pagination";

const DeActiveSellers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [parPage, setParPage] = useState(10);
    const [show, setShow] = useState(false);
    const [imageShow, setImageShow] = useState(false);
    const [state, setState] = useState("");
    const [loader, setLoader] = useState(false);
  
    const tableOption = {
      thead: ["No", "Image", "Name", "Email","Payment Status", "Status", "Actions"],
      tbody: {
        data1: {
          td: [
            1,
            <div className="w-[2.8125rem]  h-[2.8125rem] rounded-full">
              <img
                className=" h-[100%] rounded-full "
                src="../../../images/admin.jpg"
                alt=""
              />
            </div>,
            ,
            <span> Sariful Islam </span>,
            <span> sariful1234@gmail.com </span>,
            <span>pending</span>,
            <span>deactive</span>,
            <span className="flex justify-start items-center gap-1">
              <Action Icon={FaEye} bg={"bg-green-500"} />
            </span>,
          ],
        },
        data2: {
          td: [
            2,
            <div className="w-[2.8125rem]  h-[2.8125rem] rounded-full">
              <img
                className=" h-[100%] rounded-full "
                src="../../../images/admin.jpg"
                alt=""
              />
            </div>,
            ,
            <span> Sariful Islam </span>,
            <span> sariful1234@gmail.com </span>,
            <span>pending</span>,
            <span>deactive</span>,
            <span className="flex justify-start items-center gap-1">
              <Action Icon={FaEye} bg={"bg-green-500"} />
            </span>,
          ],
        },
        data3: {
          td: [
            3,
            <div className="w-[2.8125rem]  h-[2.8125rem] rounded-full">
              <img
                className=" h-[100%] rounded-full "
                src="../../../images/admin.jpg"
                alt=""
              />
            </div>,
            ,
            <span> Sariful Islam </span>,
            <span> sariful1234@gmail.com </span>,
            <span>pending</span>,
            <span>active</span>,
            <span className="flex justify-start items-center gap-1">
              <Action Icon={FaEye} bg={"bg-green-500"} />
            </span>,
          ],
        },
        data4: {
          td: [
            4,
            <div className="w-[2.8125rem]  h-[2.8125rem] rounded-full">
              <img
                className=" h-[100%] rounded-full  "
                src="../../../images/admin.jpg"
                alt=""
              />
            </div>,
            ,
            <span> Sariful Islam </span>,
            <span> sariful1234@gmail.com </span>,
            <span>pending</span>,
            <span>deactive</span>,
            <span className="flex justify-start items-center gap-1">
              <Action Icon={FaEye} bg={"bg-green-500"} />
            </span>,
          ],
        },
      },
    };
    return (
      <div className="px-2 lg:px-7 py-4">
  
        <div className="w-full">
          <div className="w-full p-4  bg-[#283046] rounded-md">
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
  
      </div>
    );
}

export default DeActiveSellers