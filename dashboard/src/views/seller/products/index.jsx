/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// action
import {
  deleteProductFromDB,
  getProductsFromDB,
  resetProductMessages,
} from "../../../store/Reducers/productSlice";

// custome & reusable components
import Search from "../../../components/search";
import Table from "../../../components/table";
import Pagination from "../../../components/pagination";
import Action from "../../../components/table-action";

// react-icons
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import DeleteConfirmation from "../../../components/modals/delete-confirmation";
import toast from "react-hot-toast";

// other third party libraries
import { HashLoader } from "react-spinners";

const tableOption = {
  thead: [
    "No",
    "Image",
    "Name",
    "Category",
    "Brand",
    "Price",
    "Discount",
    "Stock",
    "Action",
  ],
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
          <Action
            to={"/seller/dashboard/edit-product/1"}
            Icon={FaEdit}
            bg={"bg-yellow-500"}
            shadow={"hover:bg-yellow-500/50"}
          />
          <Action
            Icon={FaTrash}
            bg={"bg-red-500"}
            shadow={"hover:bg-red-500/50"}
          />
          <Action
            to={"/seller/dashboard/products/1"}
            Icon={FaEye}
            bg={"bg-green-500"}
            shadow={"hover:bg-green-500/50"}
          />
        </span>,
      ],
    },
  },
};

const Products = () => {
  const { products, totalProducts, loading, errorMessage, successMessage } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [productTableBody, setProductTableBody] = useState({});
  const [parPage, setParPage] = useState(5);
  // const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [productId, setProductId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  useEffect(() => {
    const obj = {
      page: currentPage,
      parPage,
      searchValue,
    };
    dispatch(getProductsFromDB(obj));
  }, [
    currentPage,
    parPage,
    searchValue,
    dispatch,
    errorMessage,
    successMessage,
  ]);

  // below funtion will be do when the delete button will chick it set the visibility of the deleteConfirmation modal and set the productId into a local state
  const handleProductDelete = (id) => {
    setProductId(id);
    setIsDeleteModalOpen(true);
  };

  // also thsi below functin will set the visibility of deleteConfirmation modal when the cancel button will click of the modal
  const handleDeleteModalToggle = (cb) => {
    setIsDeleteModalOpen((prev) => !prev);
    if (cb) {
      cb();
    }
  };

  const handleConfirmProductDelete = () => {
    dispatch(deleteProductFromDB({ productId }));
  };
  // The below useEffect will convert the products into table row and also add extra element which are need to render into the product table like edit button, delete button etc.
  useEffect(() => {
    const productTableBody = products.reduce((acc, product, i) => {
      let td = [
        i + 1,
        <div className="w-[2.8125rem] h-[2.8125rem]">
          <img
            className=" h-[100%] "
            src={product.images[i].url}
            alt={product.name}
          />
        </div>,
        <span> {product.name?.slice(0, 15)} </span>,
        <span>{product.category}</span>,
        <span>{product.brand}</span>,
        <span>{product.price}</span>,
        <span>
          {product.discount ? `${product.discount}%` : "discount not available"}
        </span>,
        <span>{product.stock}</span>,
        <span className="flex justify-start items-center gap-1">
          {/*  eslint-disable-next-line quotes */}
          <Action
            to={`/seller/dashboard/edit-product/${product._id}`}
            Icon={FaEdit}
            bg={"bg-yellow-500"}
            shadow={"hover:bg-yellow-500/50"}
          />
          <Action
            Icon={FaTrash}
            bg={"bg-red-500"}
            shadow={"hover:bg-red-500/50"}
            handleClick={() => handleProductDelete(product._id)}
          />
          <Action
            to={"/seller/dashboard/products/1"}
            Icon={FaEye}
            bg={"bg-green-500"}
            shadow={"hover:bg-green-500/50"}
          />
        </span>,
      ];
      acc[`data${i + 1}`] = {
        td: td,
      };
      return acc;
    }, {});
    setProductTableBody(productTableBody);
  }, [products]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }

    return () => {
      dispatch(resetProductMessages());
    };
  }, [errorMessage, successMessage]);
  return (
    <div className="px-2 lg:px-7 py-4 relative ">
      <DeleteConfirmation
        open={isDeleteModalOpen}
        setOpen={handleDeleteModalToggle}
        btnHandler={handleConfirmProductDelete}
      />
      {loading && (
        <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
          <HashLoader color="#36d7b7" size={90} />
        </div>
      )}
      {!loading && (
        <div className="w-full p-4 bg-[#283046] rounded-md z-20">
          <Search
            selectOptions={selectOptions}
            parPage={parPage}
            handleSelect={handleSelect}
            setSearch={setSearchValue}
          />

          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <Table thead={tableOption.thead} tbodys={productTableBody} />
          </div>
          <div className="w-full flex justify-end items-center mt-4 bottom-4 right-4">
            {totalProducts <= parPage ? (
              ""
            ) : (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageNumber={50}
                parPage={parPage}
                showItems={5}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
