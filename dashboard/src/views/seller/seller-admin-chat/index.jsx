import React, { useState } from "react";


// components
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";


const baseURL = import.meta.env.VITE_BASE_URL;

const SellerAdminChat = () => {
  return (
    <div className="px-2 lg:px-7 p-5">
      <div className="w-full bg-[#283046] p-4 rounded-md h-[calc(100vh-140px)] ">
        <div className="flex w-full h-full relative ">


          <div className="w-full h-full md:pl-4 ">
            {/* message header  */}
            <div className="flex justify-between items-center ">
             
                <div className="flex justify-start items-center gap-3 ">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full   "
                      src={`${baseURL}/images/admin.jpg`}
                      alt="User Image"
                    />
                    <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 "></div>
                  </div>
                  <h2 className="text-base text-white font-semibold">
                    Chat Support
                  </h2>
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
                        src={`${baseURL}/images/admin.jpg`}
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
                        src={`${baseURL}/images/admin.jpg`}
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
                        src={`${baseURL}/images/admin.jpg`}
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

export default SellerAdminChat;
