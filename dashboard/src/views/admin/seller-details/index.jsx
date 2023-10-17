import { useEffect, useState } from "react";
// react-router-dom
import { useParams } from "react-router-dom";
// react-redux
import { useSelector, useDispatch } from "react-redux";
// third-party library
import shortid from "shortid";
import { toast } from "react-hot-toast";
// custome & reusable components
import Select from "../../../components/shared/select";
import Button from "../../../components/ui/button";
import Loader from "../../../components/ui/loader";
import {
  getInactiveSellerFromDB,
  resetSellersMessages,
  updateSellerAccountStatus,
} from "../../../store/Reducers/sellerSlice";
import { BeatLoader } from "react-spinners";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// TODO: You have to create skeliton animation for userImage, userInfo and address section
const SellerDetails = () => {
  const {
    sellers,
    inactiveSellers,
    stautsUpdateLoading,
    sellerInfo,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.seller);
  const params = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const selectOptions = [
    {
      id: shortid.generate(),
      value: "",
      text: "--select status--",
    },
    {
      id: shortid.generate(),
      value: "active",
      text: "Active",
    },
    {
      id: shortid.generate(),
      value: "pending",
      text: "Pending",
    },
  ];

  useEffect(() => {
    if (inactiveSellers)
      dispatch(getInactiveSellerFromDB({ sellerId: params.sellerId }));
    if(sellers) ""
  }, []);

  const handleSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    const payload = {
      sellerId: sellerInfo._id,
      status,
    };
    dispatch(updateSellerAccountStatus(payload));
    setStatus("");
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
    return () => {
      dispatch(resetSellersMessages());
    };
  }, [errorMessage, successMessage]);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      {!sellerInfo && <Loader size={80} />}
      {sellerInfo && (
        <div className="w-full p-4 bg-[#283046] rounded-md flex flex-wrap gap-2 ">
          <div className="w-full flex flex-col md:flex-row flex-wrap text-[#d0d2d6] ">
            <div className="w-full md:w-3/12 flex justify-center items-center py-3 ">
              <div>
                <img
                  src={` ${
                    sellerInfo?.image?.url
                      ? sellerInfo.image.url
                      : `${BASE_URL}/images/admin.jpg`
                  } `}
                  alt="seller image"
                  className="w-full h-[230px] rounded-md"
                />
              </div>
            </div>

            <div className="w-full md:w-4/12">
              <div className="px-0 md:px-5 py-2 ">
                <div className="py-2 text-lg ">
                  <h2>Basic Info</h2>
                </div>
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                  <div className="flex gap-2 ">
                    <span>Name : </span>
                    <span>{sellerInfo.name}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span>Email : </span>
                    <span>{sellerInfo.email}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span>Role : </span>
                    <span> {sellerInfo.role}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span>Status : </span>
                    <span>{sellerInfo.status} </span>
                  </div>
                  <div className="flex gap-2 ">
                    <span>Payment Account : </span>
                    <span>{sellerInfo.payment}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12">
              <div className="px-0 md:px-5 py-2 ">
                <div className="py-2 text-lg ">
                  <h2>Address</h2>
                </div>
                {!sellerInfo.shopInfo && (
                  <h3>{sellerInfo.name} do not update his/her address</h3>
                )}
                {sellerInfo.shopInfo && (
                  <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                    <div className="flex gap-2 ">
                      <span>Shop Name : </span>
                      <span> {sellerInfo.shopInfo.shopName}</span>
                    </div>
                    <div className="flex gap-2 ">
                      <span>Sub Division : </span>
                      <span>{sellerInfo.shopInfo.subDivision}</span>
                    </div>
                    <div className="flex gap-2 ">
                      <span>District : </span>
                      <span>{sellerInfo.shopInfo.district}</span>
                    </div>
                    <div className="flex gap-2 ">
                      <span>State : </span>
                      <span>{sellerInfo.shopInfo.state}</span>
                    </div>
                    <div className="flex gap-2 ">
                      <span>Pin : </span>
                      <span>{sellerInfo.shopInfo.pinCode}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleStatusSubmit}>
            <div className="flex gap-4 py-3 ">
              <Select
                options={selectOptions}
                value={status}
                name={"status"}
                onChange={handleSelect}
              />
              <div className="w-[170px]">
                <Button
                  type="submit"
                  btnTxt={"Submit"}
                  isLoading={stautsUpdateLoading}
                  IconLoading={<BeatLoader color="#fff" size={"1.25rem"} />}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerDetails;
