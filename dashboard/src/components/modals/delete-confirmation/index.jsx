/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// react-redux 
import { useSelector } from "react-redux"

// custome & reusable components
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";

// react-icons
import { IoWarningOutline } from "react-icons/io5";

import { BeatLoader } from "react-spinners";

const DeleteConfirmation = ({ open, setOpen, btnHandler }) => {
  const {deleteLoading, successMessage} = useSelector(state => state.product)
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  useEffect(() => {
    if(successMessage){
      setOpen()
      setDeleteConfirmText("");

    }
  },[successMessage])
  const handleDeleteConfirmation = (e) => {
    setDeleteConfirmText(e.target.value);
   
  };

  const handleDeleteBtn = () => {
    console.log("Button clicked");
    btnHandler();
  };

  const handleCancelBtn = () => {
    setOpen(() => setDeleteConfirmText(""));
  };
  return (
    <div
      className={`p-2 md:p-0 absolute top-0 left-0 flex justify-center items-center w-full h-[calc(100vh-96px)] z-30 bg-[#283046ab] text-white ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="w-full md:w-[40%]  bg-[#142b45] rounded-md shadow-md mt-3 backdrop-blur-sm text-white  ">
        <div className="py-2 px-3  border-[#0e2239] flex justify-between items-center gap-1 border-b-2">
          <h2 className=" font-semibold text-lg text-[#d0d2d6]  ">
            Delete conformation
          </h2>
          <span className="bg-transparent ">
            <IoWarningOutline className="text-[red] bg-transparent text-[2rem]" />
          </span>
        </div>

        <div className="py-2 px-3 ">
          <p className="text-base  font-semibold text-[#d0d2d6] ">
            Thsi action cannot be undone. It will permanently delete the product
          </p>
        </div>

        <div className="py-2 px-3 ">
          <h3 className="text-base font-semibold text-[#d0d2d6] ">
            Confirm deletion by typing{" "}
            <span className="font-bold italic text-[#fff] ">delete</span> below
          </h3>

          <div className="py2">
            <InputGroup
              htmlFor={"deleteCofirmText"}
              type="text"
              placeholder={"confirm your deletion by typing delete"}
              onChange={(e) => handleDeleteConfirmation(e)}
              value={deleteConfirmText}
            />
          </div>
        </div>

        <div className="py-2 px-3 flex justify-between md:justify-end lg:justify-end items-center gap-2 ">
          <div className="md:w-[30%]">
            <Button
              type={"button"}
              btnTxt={"cancel"}
              customeClass={"text-lg w-full"}
              btnHandler={handleCancelBtn}
            />
          </div>
          <div className="md:w-[30%] ">
            <Button
              type={"button"}
              btnTxt={"delete"}
              customeClass={`text-lg ${
                deleteConfirmText === "delete"
                  ? "bg-[#bc004c] cursor-pointer"
                  : "bg-[#620b2e] cursor-not-allowed"
              }  hover:shadow-red-500/20  w-full`}
              isDisabled={
                deleteConfirmText === "delete" || deleteLoading ? false : true
              }
              btnHandler={handleDeleteBtn}
              isLoading={deleteLoading}
              IconLoading={<BeatLoader color="#ffffff" size={"1.25rem"} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
