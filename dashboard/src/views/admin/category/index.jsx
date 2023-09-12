import React, { useEffect, useState } from "react";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// React icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { BsImage } from "react-icons/bs";

// third-party library
import shortid from "shortid";

// components
import Table from "../../../components/table";
import InputGroup from "../../../components/shared/Input-group";
import Action from "../../../components/table-action";
import Pagination from "../../../components/pagination";
import Button from "../../../components/ui/button";
import Select from "../../../components/shared/select";

// react spinner
import { BeatLoader } from "react-spinners";
import { overrideStyle } from "../../../utils/overrideStyle";

// actions
import { addCategoryIntoDB, getCategoryFromDB, resetCategoryMessages } from "../../../store/Reducers/categorySlice";

// thirt-party utility libraries
import { toast } from "react-hot-toast"

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

const pageNumSelectOpt = [
  {
    id: shortid.generate(),
    value: 5,
    text: 5,
  },
  {
    id: shortid.generate(),
    value: 10,
    text: 10,
  },
  {
    id: shortid.generate(),
    value: 20,
    text: 20,
  },
];
const Category = () => {
  const { loading, errorMessage, successMessage } = useSelector((state) => state.category);
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(10);
  const [searchValue, setSearchValue] = useState('')
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState('');

  const [categoryState, setCategoryState] = useState({
    categoryName: "",
    image: {},
  });

  const handleOnChange = (e) => {
    if (e.target.name === "categoryName") {
      setCategoryState({
        ...categoryState,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "image") {
      let files = e.target.files;
      if (files.length > 0) {
        setImageShow(URL.createObjectURL(files[0]));
        setCategoryState({
          ...categoryState,
          [e.target.name]: files[0],
        });
      }
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(categoryState);
    dispatch(addCategoryIntoDB(categoryState))
  };

  const handlePageNum = (e) => {
    setParPage(e.target.value);
  };


  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  // The below use effect will be handle success and error message toaster
  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage)
    }
    if(successMessage){
      toast.success(successMessage)
      setCategoryState({
        categoryName:'',
        image:{}
      })
      setImageShow('')
    }

    return () => {
      dispatch(resetCategoryMessages())
    }
  },[errorMessage, successMessage])


  // The below useEffect will be handle the category search and pagination
  useEffect(() => {
    const payload = {
      page:currentPage,
      parPage,
      searchValue
    }

    dispatch(getCategoryFromDB(payload))

   },[parPage, currentPage, searchValue])

  return (
    <div className="px-2 lg:px-7 pt-45">

    // category page heading section
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

            {/* category page table heading  */}
            <div className="flex justify-between items-center">
              <Select
                options={pageNumSelectOpt}
                name={"parPage"}
                value={parPage}
                onChange={handlePageNum}
              />
              <div className="w-3/12">
                <InputGroup type={"text"} placeholder={"search..."} onChange={handleSearch}  />
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
            show ? "right-[10px] " : "-right-[360px]"
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
              <form onSubmit={handleOnSubmit}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <InputGroup
                    lable="Category Name"
                    type="text"
                    htmlFor={"categoryName"}
                    placeholder="category name"
                    onChange={handleOnChange}
                    value={categoryState.categoryName}
                  />
                </div>
                <div>
                  <label
                    className={`flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6] ${
                      imageShow && "p-2"
                    } `}
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt={""} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    hidden
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    btnTxt={"Add Category"}
                    type={"submit"}
                    btnHandler={handleOnSubmit}
                    isLoading={loading}
                    IconLoading={<BeatLoader color="#ffffff" size="1.2rem" />}
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
