import React, { useState } from "react";

// third-party library
import shortid from "shortid";

// Components
import Select from "../../../components/shared/select";
import Button from "../../../components/ui/button";

const SellerDetails = () => {
  const [status, setStatus] = useState("");
  const selectOptions = [
    {
      id: shortid.generate(),
      value: "",
      text: "--select status--",
    },
    {
      id: shortid.generate(),
      value: "Active",
      text: "Active",
    },
    {
      id: shortid.generate(),
      value: "Deactive",
      text: "Deactive",
    },
  ];

  const handleSelect = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#283046] rounded-md ">
        <div className="w-full flex flex-wrap text-[#d0d2d6] ">
          <div className="w-3/12 flex justify-center items-center py-3 ">
            <div>
              <img
                src="../../../../images/category/1.png"
                alt="seller image"
                className="w-full h-[230px] rounded-md"
              />
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2 ">
              <div className="py-2 text-lg ">
                <h2>Basic Info</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                <div className="flex gap-2 ">
                  <span>Name : </span>
                  <span>Sariful Islam</span>
                </div>
                <div className="flex gap-2 ">
                  <span>Email : </span>
                  <span>sariful1234@gmail.com</span>
                </div>
                <div className="flex gap-2 ">
                  <span>Role : </span>
                  <span> Seller</span>
                </div>
                <div className="flex gap-2 ">
                  <span>Status : </span>
                  <span>Pending </span>
                </div>
                <div className="flex gap-2 ">
                  <span>Payment Account : </span>
                  <span>Deactive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2 ">
              <div className="py-2 text-lg ">
                <h2>Address</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md">
                <div className="flex gap-2 ">
                  <span>Shop Name : </span>
                  <span> Sariful Store</span>
                </div>
                <div className="flex gap-2 ">
                  <span>Division : </span>
                  <span>Domkal</span>
                </div>
                <div className="flex gap-2 ">
                  <span>District : </span>
                  <span>Murshidabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form>
            <div className="flex gap-4 py-3 ">
              <Select
                options={selectOptions}
                value={status}
                name={"status"}
                onChange={handleSelect}
              />
              <div className="w-[170px]">
                <Button type="submit" btnTxt={"Submit"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
