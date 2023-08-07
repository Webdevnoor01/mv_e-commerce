import { useState } from "react";

// custome & reusable components
import Button from "../../../components/ui/button";
import InputGroup from "../../../components/shared/Input-group";
import TextArea from "../../../components/shared/text-area";
import SearchableSelect from "../../../components/shared/Input-group/searchable-select";

// react icons
import { BsImages } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

const categories = [
  {
    id: 1,
    name: "Watch",
  },
  {
    id: 2,
    name: "Pant",
  },
  {
    id: 3,
    name: "Shoose",
  },
  {
    id: 4,
    name: "T-shirt",
  },
  {
    id: 5,
    name: "Shirt",
  },
  {
    id: 6,
    name: "Laptop",
  },
  {
    id: 7,
    name: "Mobile",
  },
];

const EditProduct = () => {
  const [allCategory, setAllCategory] = useState(categories);
  const [showCategory, setShowCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const handleShowOptions = () => {
    setShowCategory((prev) => !prev);
    setAllCategory(categories);
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files);
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
    }
  };

  const changeUplodedImage = (img, index) => {
    let tempUrl;
    let tempImages;
    if (img) {
      tempUrl = imageShow;
      tempImages = images;

      console.log("tempUrl: ", tempUrl);
      console.log("tempImages: ", tempImages);

      tempImages[index] = img;
      tempUrl[index] = {
        url: URL.createObjectURL(img),
        name: img.name,
      };

      setImages([...tempImages]);
      setImageShow([...tempUrl]);

      tempUrl = null;
      tempImages = null;

      console.log("tempUrl: ", tempUrl);
      console.log("tempImages: ", tempImages);
    }
  };

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

  return (
    <div className="px-2 lg:px-7 py-4">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        {/* Product header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[#d0d2d6] text-xl font-semibold ">Edit Product</h1>
          <div className="w-[6rem]">
            <Button
              to={"/seller/dashboard/products"}
              btnTxt="Products"
              customeClass={"rounded-sm"}
            />
          </div>
        </div>

        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full flex-wrap justify-start items-center ">
              <div className="lg:w-[48%] sm:w-full ">
                <InputGroup
                  lable={"Product Name"}
                  htmlFor={"productName"}
                  type={"text"}
                  placeholder={"enter product name"}
                />
              </div>
              <div className="lg:w-[48%] sm:w-full ">
                <InputGroup
                  lable={"Brand"}
                  htmlFor={"brand"}
                  type={"text"}
                  placeholder={"enter brand name"}
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
                  handleSelectOption={setSelectedCategory}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <InputGroup
                  lable={"Stock"}
                  htmlFor={"stock"}
                  type={"text"}
                  placeholder={"enter stock number"}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <InputGroup
                  lable={"Price"}
                  htmlFor={"price"}
                  type={"number"}
                  placeholder={"enter product price"}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <InputGroup
                  lable={"Discount"}
                  htmlFor={"discount"}
                  type={"number"}
                  placeholder={"enter discount number in %"}
                />
              </div>
              <div className="w-[98%]">
                <TextArea
                  lable={"Description"}
                  name={"description"}
                  placeholder={"enter product description"}
                  height={"h-[100px]"}
                />
              </div>
              <div className="w-[96%] grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 text-[#d0d2d6] mb-4">
                {imageShow.map((image, i) => (
                  <div className="h-[180px] relative">
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
                <label
                  htmlFor="image"
                  className={`flex justify-center items-center flex-col border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6] h-[180px] cursor-pointer ${
                    imageShow.length >= 4 && "mt-4"
                  }`}
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                </label>
                <input
                  multiple
                  onChange={handleImageUpload}
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                />
              </div>

              <Button btnTxt={"Update Product"} type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
