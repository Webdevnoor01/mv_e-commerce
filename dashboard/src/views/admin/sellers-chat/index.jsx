import React, { useState } from "react";

// React Icons
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";

// components
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";

const SellersChat = () => {
  const [show, setShow] = useState(false);
  const [sellerId, setSellerId] = useState("ldksfjsdkal");

  const handleClose = () => {
    setShow((prev) => !prev);
  };
  return (
    <div className="px-2 lg:px-7 p-5">
      <div className="w-full bg-[#283046] p-4 rounded-md h-[calc(100vh-140px)] ">
        <div className="flex w-full h-full relative ">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white ">
                <h2>Sellers</h2>
                <span
                  className="block cursor-pointer md:hidden
                            "
                  onClick={handleClose}
                >
                  {" "}
                  <IoMdClose />{" "}
                </span>
              </div>

              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer bg-slate-700  `}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full  "
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute left-0 bottom-0 "></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full ">
                  <div className="flex justify-center items-between flex-col w-full ">
                    <h2 className="text-base font-semibold  ">Abdun Noor</h2>
                  </div>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer  `}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full  "
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute left-0 bottom-0 "></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full ">
                  <div className="flex justify-center items-between flex-col w-full ">
                    <h2 className="text-base font-semibold  ">Abdun Noor</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full md:w-[clac(100%-200px)] md:pl-4 ">
            {/* message header  */}
            <div className="flex justify-between items-center ">
              {sellerId && (
                <div className="flex justify-start items-center gap-3 ">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full   "
                      src="http://localhost:3000/images/admin.jpg"
                      alt="User Image"
                    />
                    <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute left-0 bottom-0 "></div>
                  </div>
                </div>
              )}
              <div
                onClick={handleClose}
                className="w-[35px] h-[35px] flex md:hidden bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer rounded-sm text-white  "
              >
                <span>
                  {" "}
                  <FaList />{" "}
                </span>
              </div>
            </div>

            {/* message body */}
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto ">
                {/* message item */}
                <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]  ">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full   "
                        src="http://localhost:3000/images/admin.jpg"
                        alt="User Image"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span>How are you today?</span>
                    </div>
                  </div>
                </div>

                {/* message-item */}
                <div className="w-full flex justify-end items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]  ">
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>I am fine?</span>
                    </div>
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full   "
                        src="http://localhost:3000/images/admin.jpg"
                        alt="User Image"
                      />
                    </div>
                  </div>
                </div>

                 {/* message item */}
                 <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]  ">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full   "
                        src="http://localhost:3000/images/admin.jpg"
                        alt="User Image"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span>What are you doing now?</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-baseline gap-3 w-full pt-2 ">
                <div className="w-10/12">
                  <InputGroup placeholder={"Enter your message"} />
                </div>
                <div className="w-2/12">
                  <Button btnTxt={"Send"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersChat;
