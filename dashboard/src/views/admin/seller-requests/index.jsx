/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
// react-redux
import { useDispatch, useSelector } from "react-redux";

// React icons
import { FaEye } from "react-icons/fa";

// components
import Table from "../../../components/table";
import Action from "../../../components/table-action";
import Pagination from "../../../components/pagination";
import { getSellerRequestsFromDB } from "../../../store/Reducers/sellerSlice";
import Search from "../../../components/search";

const tableOption = {
  thead: [
    "No",
    "Image",
    "Name",
    "Email",
    "Payment Status",
    "Status",
    "Actions",
  ],
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
        <span> Sariful Islam </span>,
        <span> sariful1234@gmail.com </span>,
        <span>isactive</span>,
        <span>pending</span>,
        <span className="flex justify-start items-center gap-1">
          <Action
            Icon={FaEye}
            bg={"bg-green-500"}
            to={"/admin/dashboard/seller-requests/details/1"}
          />
        </span>,
      ],
    },
  },
};
const SellerRequest = () => {
  const { requestedSellers, totalSellers, loading } = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(10);
  const [tbody, setTbody] = useState({});

  useEffect(() => {
    dispatch(
      getSellerRequestsFromDB({
        page: currentPage,
        parPage,
        searchValue,
      })
    );
  }, [currentPage, parPage, searchValue]);

  const handlePageSelect = (e) => {
    setParPage(e.target.value);
  };
  // The below useEffect will convert the categories into table row and also add extra element which are need to render into the category table like edit button, delete button etc.
  useEffect(() => {
    const tableBodyData = requestedSellers.reduce((acc, seller, i) => {
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
            to={`/admin/dashboard/seller-requests/details/${seller._id}`}
          />
        </span>,
      ];
      acc[`data${i + 1}`] = {
        td: td,
      };
      return acc;
    }, {});

    setTbody({ ...tableBodyData });
  }, [requestedSellers]);
  return (
    <div className="px-2 lg:px-7 py-4 relative">
      <div className="w-full">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          {/* <div className="flex justify-between items-center">
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
            </div> */}
          <Search
            parPage={parPage}
            handleSelect={handlePageSelect}
            setSearch={setSearchValue}
          />
          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <Table thead={tableOption.thead} tbodys={tbody} loading={loading} />
          </div>
          {totalSellers > parPage && (
            <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageNumber={50}
                parPage={parPage}
                showItems={5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
