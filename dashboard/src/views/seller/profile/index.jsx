import React, { useState } from "react";

import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";
import ImgSelectBox from "../../../components/shared/img-select-box";

// react-icons
import { FaEdit } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Profile = () => {
  const [image, setImage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState("deactive");
  const [userInfo, setUserInfo] = useState(false);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex items-start flex-wrap gap-5">
        <div className="w-full md:w-[49%]">
          <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md">
            <div className="flex justify-center items-center py-3">
              {image && (
                <div className="w-[300px] h-[210px] ">
                  <label htmlFor="img">
                    <img
                      className="w-full h-full cursor-pointer"
                      src={`${BASE_URL}/images/admin.jpg`}
                      alt="User Profile Picture"
                    />
                  </label>
                </div>
              )}
              {!image && (
                <div className="w-[300px] h-[210px] ">
                  <ImgSelectBox htmlFor={"img"} loader={loader} />
                </div>
              )}
              <input type="file" name="img" id="img" className="hidden" />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between flex-col text-sm gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute top-2 right-2 cursor-pointer  ">
                  <FaEdit />
                </span>

                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>Abdun Noor</span>
                </div>

                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>abdunnoor1234@gmail.com</span>
                </div>

                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>Seller</span>
                </div>

                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>Active</span>
                </div>

                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <span>
                    <p>
                      {status === "active" ? (
                        <span className="bg-green-500 text-white text-xs font-normal ml-2 px-2 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="bg-blue-500 text-white text-xs font-normal ml-2 px-2 py-0.5 rounded cursor-pointer">
                          Activate Payment
                        </span>
                      )}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {!userInfo && (
                <form>
                  <InputGroup
                    htmlFor={"shopName"}
                    lable={"Shop Name"}
                    placeholder={"Enter your shop name"}
                  />
                  <InputGroup
                    htmlFor={"subDivision"}
                    lable={"Sub Division"}
                    placeholder={"Enter your sub division"}
                  />
                  <InputGroup
                    htmlFor={"district"}
                    lable={"District"}
                    placeholder={"Enter your district"}
                  />
                  <InputGroup
                    htmlFor={"state"}
                    lable={"State"}
                    placeholder={"Enter your State"}
                  />
                  <div className="w-[30%] min-w-[100px]">
                    <Button btnTxt={"Save"} type={"submit"} />
                  </div>
                </form>
              )}

              {userInfo && (
                <div className="flex justify-between flex-col text-sm gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute top-2 right-2 cursor-pointer  ">
                    <FaEdit />
                  </span>

                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>Life Style</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Sub Division: </span>
                    <span>Dumkal</span>
                  </div>

                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>Murshidabad</span>
                  </div>

                  <div className="flex gap-2">
                    <span>State: </span>
                    <span>West Bengal</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[49%]">
          <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md">
            <h1 className="text-lg text-[#d0d2d6] font-semibold mb-3">
              Change Password
            </h1>
            <form>
              <InputGroup
                htmlFor={"email"}
                lable={"Email"}
                placeholder={"example123@gmail.com"}
              />
              <InputGroup
                htmlFor={"oldPassword"}
                lable={"Old Password"}
                placeholder={"Nsadkfj@2343"}
              />
              <InputGroup
                htmlFor={"newPassword"}
                lable={"New Password"}
                placeholder={"Nlsdkfj@234"}
              />

              <div className="w-[40%] min-w-[100px]">
                <Button btnTxt={"Change Password"} type={"submit"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
