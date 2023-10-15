import { useEffect, useState } from "react";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// ṛeact-hook-form
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// react-router-dom
import { useParams } from "react-router-dom";

// custome & reusable components
import Button from "../../../components/ui/button";
import InputGroup from "../../../components/shared/Input-group";
import TextArea from "../../../components/shared/text-area";
import SearchableSelect from "../../../components/shared/Input-group/searchable-select";
import ImgSelectBox from "../../../components/shared/img-select-box";

// actions
import {
  getProductFromDB,
  resetProductMessages,
  updateProductImageIntoDB,
  updateProductIntoDB,
} from "../../../store/Reducers/productSlice";
import { BeatLoader,FadeLoader  } from "react-spinners";
import { getCategoryFromDB } from "../../../store/Reducers/categorySlice";
import toast from "react-hot-toast";
// import { IoMdCloseCircleOutline } from 'react-icons/io';

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const EditProduct = () => {
  const { product, loading, editLoading, imageUploadLoading, errorMessage, successMessage } =
    useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [allCategory, setAllCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [changingImageIndex, setChangingImageIndex] = useState(0)

  const dispatch = useDispatch();
  const params = useParams();

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

  // Get product and categories from the database
  useEffect(() => {
    dispatch(getProductFromDB({ productId: params.productId }));
    dispatch(
      getCategoryFromDB({
        parPage: 0,
        page: 0,
        searchValue: "",
      })
    );
  }, []);

  //  Set product and categories into local state
  useEffect(() => {
    Object.keys(product)?.map((key) => {
      setValue(key, product[key]);
    });
    setSelectedCategory(product.category);
    setImageShow(product.images);

    const allCategory = categories?.reduce((acc, category) => {
      acc.push({
        name: category.name,
        id: category.slug,
      });
      return acc;
    }, []);

    setAllCategory([...allCategory]);
  }, [product, categories]);

  // const handleInputChange = (e) => {
  //   setFormState({
  //     ...formState,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleShowOptions = () => {
    setShowCategory((prev) => !prev);
    setAllCategory(categories);
  };

  const handleImageUpload = (e) => {
    setChangingImageIndex(imageShow.length)
    const files = e.target.files;
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
      dispatch(
        updateProductImageIntoDB({
          productId: params.productId,
          newImg: files,
        })
      );
    }
  };

  const changeUplodedImage = (img, files, index) => {
    setChangingImageIndex(index)
    if (files.length > 0) {
      let oldImageUrl = [...imageShow];
      console.log(oldImageUrl);
      let newImageUrl = URL.createObjectURL(files[0]);
      console.log(newImageUrl);
      oldImageUrl[index] = {
        url: newImageUrl,
      };
      dispatch(
        updateProductImageIntoDB({
          productId: params.productId,
          oldImg: img,
          newImg: files,
          index,
        })
      );
      setImageShow([...oldImageUrl]);
      console.log(index);
    }
  };

  const handleSearchOption = (e) => {
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
    let payload = Object.keys(data).reduce((acc, key) => {
      if (product[key] != data[key] && key !== "images") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    console.log(payload);
    dispatch(
      updateProductIntoDB({
        productId: params.productId,
        payload,
      })
    );
    payload = null;
  };

  const onInValid = (errors) => {
    console.log(errors);
  };

  // toggle the error and success message
  useEffect(() => {
    console.log(successMessage);
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
    <div className="px-2 lg:px-7 py-4 relative block">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        {/* Product header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[#d0d2d6] text-xl font-semibold ">
            Edit Product
          </h1>
          <div className="w-[6rem]">
            <Button
              to={"/seller/dashboard/products"}
              btnTxt="Products"
              customeClass={"rounded-sm bg-blue-500 hover:shadow-blue-500/50"}
            />
          </div>
        </div>
        <div>
          {editLoading ? (
            "Loading..."
          ) : (
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
                  {imageShow?.map((image, i) => (
                    <div key={i} className="h-[180px]  mb-1">
                      <label htmlFor={i} className="cursor-pointer relative">
                        <img
                          className="h-[100%] "
                          src={image?.url}
                          alt={image?.name}
                          title={image?.name}
                        />
                        {
                          imageUploadLoading && (changingImageIndex == i) && (
                            <div className="absolute top-0 left-0 h-full w-full z-50 flex justify-center items-center bg-[#201f1f95] text-white  " >
                            <span><FadeLoader color="#36d7b7" /></span>
                          </div>
                          )
                        }
                       
                      </label>
                      <input
                        onChange={(e) =>
                          changeUplodedImage(image, e.target.files, i)
                        }
                        type="file"
                        name={i}
                        id={i}
                        className="hidden"
                        multiple={true}
                      />
                      {/* <span
                      className="p-2 bg-slate-700 z-10 hover:shadow-lg hover:shadow-slate-400/50 cursor-pointer absolute top-1 right-1 rounded-full "
                      onClick={() => removeUploadImage(i)}
                    >
                      {' '}
                      <IoMdCloseCircleOutline />{' '}
                    </span> */}
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
                  btnTxt={"Update Product"}
                  type="submit"
                  isLoading={loading}
                  IconLoading={<BeatLoader color="#ffffff" size={"1.25rem"} />}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
