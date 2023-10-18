import { memo, useEffect, useState } from "react";
// react-redux
import { useDispatch, useSelector } from "react-redux";
// react-hook-form
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// custome and reusable components
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";
import ImgSelectBox from "../../../components/shared/img-select-box";
// react-icons
import { FaEdit } from "react-icons/fa";
import {
  resetMessages,
  sellerImageUpload,
  sellerShopInfoUpload,
} from "../../../store/Reducers/authSlice";
// third-party libraries
import { toast } from "react-hot-toast";
import { FadeLoader, BeatLoader } from "react-spinners";

const Profile = () => {
  const { userInfo, errorMessage, successMessage, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [isShopInfoEditOpen, setIsShopInfoEditOpen] = useState(
    userInfo.shopInfo ? false : true
  );
  console.log("open ", isShopInfoEditOpen);
  // react-hook-form implemantation
  // form validation using yup
  const formValidationSchema = yup.object().shape({
    shopName: yup.string().required("shop name is required"),
    district: yup.string().required("sistrict name is required"),
    subDivision: yup.string().required("sub division name is required"),
    state: yup.string().required("state name is required"),
    pinCode: yup
      .string()
      .max(6, "Please type valid pin code")
      .required("pinCode name is required"),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      shopName: "",
      district: "",
      subDivision: "",
      state: "",
      pinCode: "",
    },
    resolver: yupResolver(formValidationSchema),
    reValidateMode: "onChange",
  });

  const onValid = (data) => {
    console.log(userInfo)
    dispatch(sellerShopInfoUpload({ data, userId: userInfo.id }));
    // setIsShopInfoEditOpen(!isShopInfoEditOpen)
  };

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };
  // react-hook-form implemantation end

  // The below function will be handle the user image uploading functionalities.
  const handleImageUpload = (e) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setImage({ url: imgUrl });
    dispatch(
      sellerImageUpload({ image: e.target.files, userId: userInfo._id })
    );
  };

  const handleShopInfoEditBtn = () => {
    setIsShopInfoEditOpen(!isShopInfoEditOpen);
    if (userInfo.shopInfo) {
      Object.keys(userInfo.shopInfo).map((key) => {
        setValue(key, userInfo?.shopInfo[key]);
      });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
      setIsShopInfoEditOpen(!isShopInfoEditOpen)

    }
    return () => {
      dispatch(resetMessages());
    };
  }, [errorMessage, successMessage, loading]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex items-start flex-wrap gap-5">
        <div className="w-full md:w-[49%]">
          <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md">
            {/* user image */}
            <div className="flex justify-center items-center py-3">
              {(userInfo.image?.url || image?.url) && (
                <div className=" w-[180px] h-[180px] relative ">
                  {/* profile image */}
                  <label htmlFor="img" className="rounded-full z-30">
                    <img
                      className="w-full h-full rounded-full cursor-pointer"
                      src={`${image.url ? image.url : userInfo.image.url}`}
                      alt="User Profile Picture"
                    />
                  </label>

                  {/* loader */}
                  {loading && (
                    <div className="absolute top-0 left-0 h-full w-full z-50 flex justify-center items-center rounded-full bg-[#201f1f95] text-white  ">
                      <span>
                        <FadeLoader color="#36d7b7" />
                      </span>
                    </div>
                  )}
                </div>
              )}
              {!(userInfo.image?.url || image?.url) && (
                <div className="w-[300px] h-[210px] ">
                  <ImgSelectBox htmlFor={"img"} onChange={handleImageUpload} />
                </div>
              )}
              <input
                type="file"
                name="img"
                id="img"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* User info */}
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between flex-col text-sm gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute top-2 right-2 cursor-pointer  ">
                  <FaEdit />
                </span>

                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>{userInfo.name}</span>
                </div>

                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>{userInfo.email}</span>
                </div>

                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>{userInfo.role}</span>
                </div>

                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>{userInfo.status}</span>
                </div>

                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <span>
                    <p>
                      {userInfo?.payment === "active" ? (
                        <span className="bg-green-500 text-white text-xs font-normal ml-2 px-2 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white text-xs font-semibold ml-2 px-2 py-0.5 rounded cursor-pointer">
                          Inactive
                        </span>
                      )}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {/* form for uploading shop info of the seller */}
              {(userInfo.shopInfo && !isShopInfoEditOpen) ? (
                <div className="flex justify-between flex-col text-sm gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute top-2 right-2 cursor-pointer"
                    onClick={handleShopInfoEditBtn}
                  >
                    <FaEdit />
                  </span>

                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Sub Division: </span>
                    <span>{userInfo.shopInfo.subDivision}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>{userInfo.shopInfo.district}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>State: </span>
                    <span>{userInfo.shopInfo.state}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Pin: </span>
                    <span>{userInfo.shopInfo.pinCode}</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                  <Controller
                    name="shopName"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Shop Name"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your shop name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />
                  <Controller
                    name="subDivision"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Sub Division"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your sub division"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="district"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"District"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your district name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"State"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your state name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="pinCode"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Pin"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your pin number"}
                        error={errors[name]?.message}
                      />
                    )}
                  />
                  <div className="w-[30%] min-w-[100px]">
                    <Button
                      btnTxt={"Save"}
                      type={"submit"}
                      isLoading={loading}
                      isDisabled={loading}
                      IconLoading={<BeatLoader color="#fff" size={"1.5rem"} />}
                    />
                  </div>
                </form>
              )}
              {/* { !(userInfo.shopInfo || isShopInfoEditOpen) && (
                <form onSubmit={handleSubmit(onValid, onInvalid)}>
                  <Controller
                    name="shopName"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Shop Name"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your shop name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />
                  <Controller
                    name="subDivision"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Sub Division"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your sub division"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="district"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"District"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your district name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"State"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your state name"}
                        error={errors[name]?.message}
                      />
                    )}
                  />

                  <Controller
                    name="pinCode"
                    control={control}
                    render={({ field: { value, name, onChange, onBlur } }) => (
                      <InputGroup
                        htmlFor={name}
                        lable={"Pin"}
                        type={"text"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={"Enter your pin number"}
                        error={errors[name]?.message}
                      />
                    )}
                  />
                  <div className="w-[30%] min-w-[100px]">
                    <Button
                      btnTxt={"Save"}
                      type={"submit"}
                      isLoading={loading}
                      isDisabled={loading}
                      IconLoading={<BeatLoader color="#fff" size={"1.5rem"} />}
                    />
                  </div>
                </form>
              )}

              {/* seller shop info */}
              {/* {!(userInfo.shopInfo && isShopInfoEditOpen) && (
                <div className="flex justify-between flex-col text-sm gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span
                    className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute top-2 right-2 cursor-pointer"
                    onClick={handleShopInfoEditBtn}
                  >
                    <FaEdit />
                  </span>

                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Sub Division: </span>
                    <span>{userInfo.shopInfo.subDivision}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>{userInfo.shopInfo.district}</span>
                  </div>

                  <div className="flex gap-2">
                    <span>State: </span>
                    <span>{userInfo.shopInfo.state}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Pin: </span>
                    <span>{userInfo.shopInfo.pinCode}</span>
                  </div>
                </div>
              )} */}
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

export default memo(Profile);
