import { useEffect, useState } from "react";

// react-redux
import { useSelector, useDispatch } from "react-redux";

// ṛeact-hook-form
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// actions
import { getCategoryFromDB } from "../../../store/Reducers/categorySlice";
import {
  addProductIntoDB,
  resetProductMessages,
} from "../../../store/Reducers/productSlice";

// custome & reusable components
import Button from "../../../components/ui/button";
import InputGroup from "../../../components/shared/Input-group";
import TextArea from "../../../components/shared/text-area";
import SearchableSelect from "../../../components/shared/Input-group/searchable-select";
import ImgSelectBox from "../../../components/shared/img-select-box";

// react icons
import { IoMdCloseCircleOutline } from "react-icons/io";

// Third-party libraries
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const AddProduct = () => {
  const { categories } = useSelector((state) => state.category);
  const { errorMessage, successMessage, loading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const [allCategory, setAllCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  // form validation
  const formValidationSchema = yup.object().shape({
    name: yup.string().required("name name is required"),
    brand: yup.string().required("brand name is required"),
    category: yup.string().required("category name is required"),
    stock: yup.string().required("stock is required"),
    price: yup.string().required("price is required"),
    discount: yup.string().required("discount is required"),
    description: yup.string().required("description name is required"),
  });

  // Hnadling form functionality
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      stock: "",
      price: "",
      discount: "",
      description: "",
    },
    resolver: yupResolver(formValidationSchema),
    reValidateMode: "onChange",
  });

  // Getting all categegory from DataBase
  useEffect(() => {
    dispatch(
      getCategoryFromDB({
        parPage: 0,
        page: 0,
        searchValue: "",
      })
    );
  }, [dispatch]);

  // setting all categories
  useEffect(() => {
    const allCategories = categories.reduce((acc, category) => {
      acc.push({
        id: category._id,
        name: category.name,
      });
      return acc;
    }, []);

    setAllCategory(allCategories);
  }, [categories]);

  // This below function will help you to upload(choose from device) the image
  const handleImageUpload = (e) => {
    const files = e.target.files;
    console.log(files);
    setImages([...images, ...e.target.files]);
    if (files.length > 0) {
      setImageShow([...images, ...files]);
      let imageUrls = [];

      for (let i = 0; i < files.length; i++) {
        imageUrls.push({
          url: URL.createObjectURL(files[i]),
          name: files[i].name,
        });
      }
      setImageShow([...imageShow, ...imageUrls]);
    }
  };

  // This below function will help you to change the uploded image in the same position, I mean replace the image
  const changeUplodedImage = (img, index) => {
    let tempUrl;
    let tempImages;
    if (img) {
      tempUrl = imageShow;
      tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = {
        url: URL.createObjectURL(img),
        name: img.name,
      };

      setImages([...tempImages]);
      setImageShow([...tempUrl]);

      tempUrl = null;
      tempImages = null;
    }
  };

  // This below function will help you to remove the uploaded image from the ui not from the database
  const removeUploadImage = (index) => {
    let tempImageUrl = imageShow;
    tempImageUrl.splice(index, 1);
    let tempImages = images;
    tempImages.splice(index, 1);

    setImageShow([...tempImageUrl]);
    setImages([...tempImageUrl]);
    tempImageUrl = null;
    tempImages = null;
  };

  const handleShowOptions = () => {
    setShowCategory((prev) => !prev);
  };

  // the below function will be handle the search functionality of category in the form
  const handleSearchOption = (e) => {
    console.log();
    let value = e.target.value;
    setSearchValue(value);
    if (value) {
      let categories = allCategory.filter(
        (category) =>
          category.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(categories);
    } else {
      setAllCategory(categories);
    }
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    setValue("category", category);
    if (category) {
      clearErrors("category");
    }
  };

  const onValid = (data) => {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    formData.append("shopName", "Khariddar");
    dispatch(addProductIntoDB(formData));
  };

  const onInValid = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
      setImages([]);
      setImageShow([]);
      reset({
        name: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        discount: "",
        description: "",
      });
    }

    return () => {
      dispatch(resetProductMessages());
    };
  }, [errorMessage, successMessage, dispatch, reset]);
  return (
    <div className="px-2 lg:px-7 py-4">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        {/* Product header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[#d0d2d6] text-xl font-semibold ">Add Product</h1>
          <div className="w-[6rem]">
            <Button
              to={"/seller/dashboard/products"}
              btnTxt="Products"
              customeClass={"rounded-sm"}
            />
          </div>
        </div>

        <div>
          {/* Product add form */}
          <form onSubmit={handleSubmit(onValid, onInValid)}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full flex-wrap justify-start items-center ">
              <div className="lg:w-[48%] sm:w-full ">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <InputGroup
                      lable={"Product Name"}
                      htmlFor={name}
                      type={"text"}
                      placeholder={"enter product name"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.name?.message}
                    />
                  )}
                />
              </div>
              <div className="lg:w-[48%] sm:w-full ">
                <Controller
                  control={control}
                  name="brand"
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <InputGroup
                      lable={"Brand"}
                      htmlFor={name}
                      type={"text"}
                      placeholder={"enter brand name"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.brand?.message}
                    />
                  )}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <SearchableSelect
                  lable={"Category"}
                  htmlFor={"category"}
                  placeholder={"--select category--"}
                  options={allCategory}
                  value={selectedCategory && selectedCategory}
                  searchValue={searchValue}
                  showSearch={showCategory}
                  setSearchValue={setSearchValue}
                  selectedOption={selectedCategory}
                  handleShowSearch={handleShowOptions}
                  handleSearchOption={handleSearchOption}
                  handleSelectOption={handleSelectedCategory}
                  error={errors.category?.message}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field: { value, onChange, onBlur, name } }) => (
                    <InputGroup
                      lable={"Stock"}
                      htmlFor={name}
                      type={"text"}
                      placeholder={"enter stock number"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.stock?.message}
                    />
                  )}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <InputGroup
                      lable={"Price"}
                      htmlFor={name}
                      type={"text"}
                      placeholder={"enter product price"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.price?.message}
                    />
                  )}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <Controller
                  name="discount"
                  control={control}
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <InputGroup
                      lable={"Discount"}
                      htmlFor={name}
                      type={"text"}
                      placeholder={"enter discount number in %"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.discount?.message}
                    />
                  )}
                />
              </div>
              <div className="w-[98%]">
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <TextArea
                      lable={"Description"}
                      name={name}
                      placeholder={"enter product description"}
                      height={"h-[100px]"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors.description?.message}
                    />
                  )}
                />
              </div>
              <div className="w-[96%] grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 text-[#d0d2d6] mb-4">
                {imageShow.map((image, i) => (
                  <div key={i} className="h-[180px] relative">
                    <label htmlFor={i} className="cursor-pointer">
                      <img
                        className="h-[100%]"
                        src={image.url}
                        alt={image.name}
                        title={image.name}
                      />
                    </label>
                    <input
                      onChange={(e) => changeUplodedImage(e.target.files[0], i)}
                      type="file"
                      name={i}
                      id={i}
                      className="hidden"
                      multiple={true}
                    />
                    <span
                      className="p-2 bg-slate-700 z-10 hover:shadow-lg hover:shadow-slate-400/50 cursor-pointer absolute top-1 right-1 rounded-full "
                      onClick={() => removeUploadImage(i)}
                    >
                      {" "}
                      <IoMdCloseCircleOutline />{" "}
                    </span>
                  </div>
                ))}

                <div className="w-[300px] h-[210px]">
                  <ImgSelectBox
                    htmlFor={"image"}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <Button
                btnTxt={"Add Product"}
                type="submit"
                isLoading={loading}
                IconLoading={<BeatLoader color="#ffffff" size={"1.25rem"} />}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
