import { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

// custome & reusable components
import Card from "../../../components/card";
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";

// react-icons
import { BsCurrencyDollar } from "react-icons/bs";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWhell={handleOnWheel} {...props} />
));

const Row = ({ style, index }) => {
  return (
    <div style={style} className="flex text-sm">
      <div className="w-[25%] p-2 whitespace-nowrap  text-[#d0d2d6]">
        {" "}
        {index + 1}{" "}
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap text-[#d0d2d6] ">
        {" "}
        $454{" "}
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap ">
        <span className="py-[1px] px-[5px] w-[70%] flex justify-center items-center bg-blue-500  rounded-md text-xs text-[#d0d2d6] ">
          {" "}
          pending{" "}
        </span>
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap  text-[#d0d2d6] ">
        {" "}
        12 jun 2023{" "}
      </div>
    </div>
  );
};
const Payments = () => {
  return (
    <div className="px-2 md:px-7 py-5">
      <section className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4 ">
        <Card
          title={"Total Sells"}
          value={"$23980"}
          Icon={BsCurrencyDollar}
          bg={"#28c76f1f"}
          tc={"#28c76f"}
          fz={"text-xl"}
          font={"font-normal"}
          titleFz={"text-sm"}
        />
        <Card
          title={"Available Payments"}
          value={"$23980"}
          Icon={BsCurrencyDollar}
          bg={"#e000e81f"}
          tc={"#cd00e8"}
          fz={"text-xl"}
          font={"font-normal"}
          titleFz={"text-sm"}
        />
        <Card
          title={"Withdrawl Amoount"}
          value={"$23980"}
          Icon={BsCurrencyDollar}
          bg={"#00cfe81f"}
          tc={"#00cfe8"}
          fz={"text-xl"}
          font={"font-normal"}
          titleFz={"text-sm"}
        />
        <Card
          title={"Total Sells"}
          value={"$23980"}
          Icon={BsCurrencyDollar}
          bg={"#7367f01f"}
          tc={"#7367f0"}
          fz={"text-xl"}
          font={"font-normal"}
          titleFz={"text-sm"}
        />
      </section>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
        <div className="bg-[#283046] text-[#d0d2d6] rounded-md p-2">
          <h2 className="text-lg">Send Request</h2>
          <div className="pt-5">
            <form>
              <div className="flex gap-3 flex-wrap">
                <div className="w-full md:w-[79%]">
                  <InputGroup
                    type={"number"}
                    htmlFor={"amount"}
                    placeholder={"Enter the amount"}
                  />
                </div>
                <div className="w-full md:w-[17%] lg:w-[17%] py-1 px-5 md:py-0 md:px0 lg:px-0 md:px-0 ">
                  <Button btnTxt={"SUBMIT"} type={"submit"} />
                </div>
              </div>
            </form>
            <div className="">
              <h2 className="text-lg pb-4">Pending Request</h2>
              <div className="w-ful overflow-y-auto">
                <div className="flex item-center bg-[#161d31] uppercase text-sx min-w-[340px] px-[.3rem]  ">
                  <div className="w-[25%] pb-2 text-[#d0d2d6] ">No</div>
                  <div className="w-[25%] pb-2 text-[#d0d2d6] ">Amount</div>
                  <div className="w-[25%] pb-2 text-[#d0d2d6] ">Status</div>
                  <div className="w-[25%] pb-2 text-[#d0d2d6] ">date</div>
                </div>
                {
                  <List
                    style={{
                      overflowX: "hidden",
                      minWidth: "340px",
                    }}
                    height={350}
                    className="List"
                    itemCount={100}
                    itemSize={35}
                    outerElementType={outerElementType}
                  >
                    {Row}
                  </List>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#283046] text-[#d0d2d6] rounded-md p-2">
          <div className="pt-5">
            <h2 className="text-lg pb-4">Success Withdrwal</h2>
            <div className="w-ful overflow-y-auto">
              <div className="flex item-center bg-[#161d31] uppercase text-sx min-w-[340px] px-[.3rem]  ">
                <div className="w-[25%] pb-2 text-[#d0d2d6] ">No</div>
                <div className="w-[25%] pb-2 text-[#d0d2d6] ">Amount</div>
                <div className="w-[25%] pb-2 text-[#d0d2d6] ">Status</div>
                <div className="w-[25%] pb-2 text-[#d0d2d6] ">date</div>
              </div>
              {
                <List
                  style={{
                    overflowX: "hidden",
                    minWidth: "340px",
                  }}
                  height={350}
                  className="List"
                  itemCount={100}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
