import  { useState } from 'react';
import Select from '../../../components/shared/select';
import shortid from 'shortid';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const OrderDetails = () => {
  const [orderStatus, setOrderStatus] = useState('pending');

  const orderStatusOptions = [
    {
      id: shortid.generate(),
      value: 'pending',
      text: 'Pending',
    },
    {
      id: shortid.generate(),
      value: 'processing',
      text: 'Processing',
    },
    {
      id: shortid.generate(),
      value: 'warehouse',
      text: 'Warehouse',
    },
    {
      id: shortid.generate(),
      value: 'placed',
      text: 'Placed',
    },
    {
      id: shortid.generate(),
      value: 'cancel',
      text: 'Cancel',
    },
  ];
  const handleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  return (
    <div className="px-2 lg:px-7 pt-45">
      <div className="w-full p-4 bg-[#283046] rounded-md ">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <Select
            options={orderStatusOptions}
            value={orderStatus}
            onChange={handleOrderStatus}
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h1>lsadfjdskjh3443q4</h1>
            <span>11 jul 2023</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%] ">
              <div className="pr-3 text-lg text-[#d0d2d6]  ">
                <div className="flex flex-col gap-1 ">
                  <h2 className="pb-2 font-semibold ">
                    Deliver to : Warehouse
                  </h2>
                  <p className="text-sm">
                    {' '}
                    <span>
                      Chakjama Islampur Islampur Murshidabad West Bengal
                    </span>{' '}
                  </p>
                </div>
                <div className=" flex justify-start items-center gap-3 ">
                  <h2>Payment status: </h2>
                  <span className="text-base">paid</span>
                </div>
                <span>Price: $1000</span>
                <div className="mt-4 flex flex-col gap-4 ">
                  <div className="text-[#d0d2d6]">
                    {/* TODO: I need to create the below div reusable as prodech detail  */}
                    <div className="flex text-md gap-3">
                      <img
                        className="w-[45px] h-[55px]"
                        src={`${BASE_URL}/images/category/1.png`}
                      />
                      <div>
                        <h2>long long T-shirt</h2>
                        <p>
                          <span>Brand: Easy </span>
                          <span className="text-lg">Quantity : 2</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex text-md gap-3">
                      <img
                        className="w-[45px] h-[55px]"
                        src={`${BASE_URL}/images/category/1.png`}
                      />
                      <div>
                        <h2>long long T-shirt</h2>
                        <p>
                          <span>Brand: Easy </span>
                          <span className="text-lg">Quantity : 2</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex text-md gap-3">
                      <img
                        className="w-[45px] h-[55px]"
                        src={`${BASE_URL}/images/category/1.png`}
                      />
                      <div>
                        <h2>long long T-shirt</h2>
                        <p>
                          <span>Brand: Easy </span>
                          <span className="text-lg">Quantity : 2</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
