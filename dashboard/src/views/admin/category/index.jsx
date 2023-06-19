import React, { useState } from "react";

// React icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { BsImage } from "react-icons/bs";

// components
import Table from "../../../components/table";
import InputGroup from "../../../components/shared/Input-group";
import Action from "../../../components/table-action";
import Pagination from "../../../components/pagination";
import Button from "../../../components/ui/button";

// react spinner
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../../utils/overrideStyle";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [parPage, setParPage] = useState(10);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [state, setState] = useState("");
  const [loader, setLoader] = useState(false);

  const tableOption = {
    thead: ["No", "Image", "Name", "Actions"],
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
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEdit} bg={"bg-yellow-500"} />
            <Action Icon={FaTrash} bg={"bg-red-500"} />
          </span>,
        ],
      },
      data2: {
        td: [
          2,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className="h-[100%] "
              src="../../../images/category/2.png"
              alt=""
            />
          </div>,
          ,
          <span> Accessories </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEdit} bg={"bg-yellow-500"} />
            <Action Icon={FaTrash} bg={"bg-red-500"} />
          </span>,
        ],
      },
      data3: {
        td: [
          3,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className="h-[100%] "
              src="../../../images/category/4.png"
              alt=""
            />
          </div>,
          ,
          <span> Headphones </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEdit} bg={"bg-yellow-500"} />
            <Action Icon={FaTrash} bg={"bg-red-500"} />
          </span>,
        ],
      },
      data4: {
        td: [
          3,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className="h-[100%] "
              src="../../../images/category/5.png"
              alt=""
            />
          </div>,
          ,
          <span> Laptop </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEdit} bg={"bg-yellow-500"} />
            <Action Icon={FaTrash} bg={"bg-red-500"} />
          </span>,
        ],
      },
      data5: {
        td: [
          3,
          <div className="w-[2.8125rem] h-[2.8125rem]">
            <img
              className="h-[100%] "
              src="../../../images/category/5.png"
              alt=""
            />
          </div>,
          ,
          <span> Laptop </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEdit} bg={"bg-yellow-500"} />
            <Action Icon={FaTrash} bg={"bg-red-500"} />
          </span>,
        ],
      },
    },
  };
  return (
    <div className="px-2 lg:px-7 pt-45">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] ">
        <h1 className="text-[#d0d2d6] font-semibold ">Categories</h1>

        <Button
          type="button"
          btnTxt="Add"
          btnHandler={() => setShow((prevShow) => !prevShow)}
          customeClass={"w-[25%]"}
        />
      </div>
      <div className="flex justify-start items-start gap-2">
        <div className="w-full lg:1-7/12">
          <div className="className='w-full p-4  bg-[#283046] rounded-md">
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

        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "-right-[360px]" : "right-[10px]"
          } top-0 transition-all duration-500 pt-[.7rem] z-50 rounded-md`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl">
                  Add Category
                </h1>
                <div
                  onClick={() => setShow((prevShow) => !prevShow)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="bg-indigo-500" stroke="#d0d2d6" />
                </div>
              </div>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <InputGroup
                    lable="Category Name"
                    type="text"
                    htmlFor={"category_name"}
                    placeholder="category name"
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <InputGroup type="file" htmlFor={"image"} hidden={true} />
                <div className="mt-4">
                  <Button
                    type="submit"
                    btnTxt="Add Category"
                    isLoading={loader}
                    IconLoading={
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
