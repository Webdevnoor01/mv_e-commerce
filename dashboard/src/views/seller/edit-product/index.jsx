import { useEffect, useState } from 'react';

// custome & reusable components
import Button from '../../../components/ui/button';
import InputGroup from '../../../components/shared/Input-group';
import TextArea from '../../../components/shared/text-area';
import SearchableSelect from '../../../components/shared/Input-group/searchable-select';
import ImgSelectBox from '../../../components/shared/img-select-box';


const categories = [
  {
    id: 1,
    name: 'Watch',
  },
  {
    id: 2,
    name: 'Pant',
  },
  {
    id: 3,
    name: 'Shoose',
  },
  {
    id: 4,
    name: 'T-shirt',
  },
  {
    id: 5,
    name: 'Shirt',
  },
  {
    id: 6,
    name: 'Laptop',
  },
  {
    id: 7,
    name: 'Mobile',
  },
];

const BASE_URL = import.meta.env.VITE_BASE_URL;
const EditProduct = () => {
  const [formState, setFormState] = useState({
    productName: '',
    brand: '',
    stock: '',
    discount: '',
    price: '',
    description: '',
  });
  const [allCategory, setAllCategory] = useState(categories);
  const [showCategory, setShowCategory] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  useEffect(() => {
    setFormState({
      productName: 'Asana brand red t-shirt',
      brand: 'Asana',
      stock: 5,
      discount: 10,
      price: 1280,
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio illo consectetur velit impedit! Sit tempore recusandae porro ex incidunt voluptatibus at nisi a corporis dicta minima tempora ad ut, libero officia cumque iusto neque cupiditate iure dolorum possimus aliquam, eveniet ipsam? Esse excepturi laudantium doloremque saepe perspiciatis reprehenderit, quidem officia?',
    });

    setSelectedCategory('T-shirt');
    setImageShow([
      {
        url: `${BASE_URL}/images/admin.jpg`,
        name: 'product A',
      },
      {
        url: `${BASE_URL}/images/admin.jpg`,
        name: 'product B',
      },
      {
        url: `${BASE_URL}/images/admin.jpg`,
        name: 'product C',
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

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

  const changeUplodedImage = (img, files, index) => {
    if (files.length > 0) {
      console.log('oldImg ', img);
      console.log('newImg ', files);
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

  return (
    <div className="px-2 lg:px-7 py-4">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        {/* Product header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[#d0d2d6] text-xl font-semibold ">
            Edit Product
          </h1>
          <div className="w-[6rem]">
            <Button
              to={'/seller/dashboard/products'}
              btnTxt="Products"
              customeClass={'rounded-sm'}
            />
          </div>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full flex-wrap justify-start items-center">
              <div className="lg:w-[48%] sm:w-full ">
                <InputGroup
                  lable={'Product Name'}
                  htmlFor={'productName'}
                  type={'text'}
                  placeholder={'enter product name'}
                  value={formState.productName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full ">
                <InputGroup
                  lable={'Brand'}
                  htmlFor={'brand'}
                  type={'text'}
                  placeholder={'enter brand name'}
                  value={formState.brand}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <SearchableSelect
                  lable={'Category'}
                  htmlFor={'category'}
                  placeholder={'--select category--'}
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
                  lable={'Stock'}
                  htmlFor={'stock'}
                  type={'text'}
                  placeholder={'enter stock number'}
                  value={formState.stock}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <InputGroup
                  lable={'Price'}
                  htmlFor={'price'}
                  type={'number'}
                  placeholder={'enter product price'}
                  value={formState.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="lg:w-[48%] sm:w-full">
                <InputGroup
                  lable={'Discount'}
                  htmlFor={'discount'}
                  type={'number'}
                  placeholder={'enter discount number in %'}
                  value={formState.discount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-[98%]">
                <TextArea
                  lable={'Description'}
                  name={'description'}
                  placeholder={'enter product description'}
                  height={'h-[100px]'}
                  value={formState.description}
                  onChange={handleInputChange}
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
                      onChange={(e) => changeUplodedImage(image, e.files, i)}
                      type="file"
                      name={i}
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
                <div className="w-[300px] h-[210px]">
                  <ImgSelectBox
                    htmlFor={'image'}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <Button btnTxt={'Update Product'} type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
