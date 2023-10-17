/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

// third-party libraries
import shortid from "shortid";

// React icons
import { FaEye } from "react-icons/fa";


// components
import Table from "../../../components/table";
import InputGroup from "../../../components/shared/Input-group";
import Action from "../../../components/table-action";
import Pagination from "../../../components/pagination";
import Select from "../../../components/shared/select"
import { useDispatch, useSelector } from "react-redux";
import { getActiveSellersFromDB } from "../../../store/Reducers/sellerSlice";

const Sellers = () => {
  const { sellers, totalSellers, loading } = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(10);
  const [tbody, setTbody] = useState({});

  const tableOption = {
    thead: ["No", "Image", "Name", "shop Name", "Payment Status", "Email", "Dividion", "District", "Actions"],
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
          <span> Sariful Islam </span>,
          <span>Saruful Fashion</span>,
          <span>pending</span>,
          <span> sariful1234@gmail.com </span>,
          <span>Domkal</span>,
          <span> Murshidabad </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} to={"/admin/dashboard/seller/details/1"} />
          </span>,
        ],
      },
      data2: {
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
          <span> Sariful Islam </span>,
          <span>Saruful Fashion</span>,
          <span>pending</span>,
          <span> sariful1234@gmail.com </span>,
          <span>Domkal</span>,
          <span> Murshidabad </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} to={"/admin/dashboard/seller/details/1"} />
          </span>,
        ],
      },
      data3: {
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
          <span> Sariful Islam </span>,
          <span>Saruful Fashion</span>,
          <span>pending</span>,
          <span> sariful1234@gmail.com </span>,
          <span>Domkal</span>,
          <span> Murshidabad </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} to={"/admin/dashboard/seller/details/1"} />
          </span>,
        ],
      },
      data4: {
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
          <span> Sariful Islam </span>,
          <span>Saruful Fashion</span>,
          <span>pending</span>,
          <span> sariful1234@gmail.com </span>,
          <span>Domkal</span>,
          <span> Murshidabad </span>,
          <span className="flex justify-start items-center gap-1">
            <Action Icon={FaEye} bg={"bg-green-500"} to={"/admin/dashboard/seller/details/1"} />
          </span>,
        ],
      },
    },
  };
  useEffect(() => {
    dispatch(
      getActiveSellersFromDB({
        page: currentPage,
        parPage,
        searchValue,
      })
    );
  }, [currentPage, parPage, searchValue]);
  

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
// The below useEffect will convert the categories into table row and also add extra element which are need to render into the category table like edit button, delete button etc.
useEffect(() => {
  const tableBodyData = sellers.reduce((acc, seller, i) => {
    let td = [
      i + 1,
      <div className="w-[2.8125rem] h-[2.8125rem]   rounded-full">
        <img
          className=" w-full h-full  rounded-full "
          src={`${
            seller.image.url ? seller.image.url : "../../../images/admin.jpg"
          }`}
          alt={seller.name}
        />
      </div>,
      <span> {seller.name} </span>,
      <span> {seller.email} </span>,
      <span>{seller.payment}</span>,
      <span>{seller.status}</span>,
      <span className="flex justify-start items-center gap-1">
        <Action
          Icon={FaEye}
          bg={"bg-green-500"}
          to={`/admin/dashboard/seller/details/${seller._id}`}
        />
      </span>,
    ];
    acc[`data${i + 1}`] = {
      td: td,
    };
    return acc;
  }, {});

  setTbody({ ...tableBodyData });
}, [sellers]);
  const handlePageNum = (e) => {
    setParPage(e.target.value)
  }
  return (
    <div className="px-2 lg:px-7 py-4">

      <div className="w-full">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          <div className="flex justify-between items-center">
           <Select options={pageNumSelectOpt} name={"parPage"} value={parPage} onChange={handlePageNum} />
            <div className="w-3/12">
              <InputGroup type={"text"} placeholder={"search..."} />
            </div>
          </div>

          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <Table thead={tableOption.thead} tbodys={tbody} loading={loading} />
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
};

export default Sellers;
