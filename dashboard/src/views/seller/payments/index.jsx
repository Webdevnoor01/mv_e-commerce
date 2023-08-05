import React from "react";


import Card from "../../../components/card";


// react-icons
import { BsCurrencyDollar } from "react-icons/bs"


const Payments = () => {
  return (
    <div className="px-2 md:px-7 py-5">
      <section className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
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
    </div>
  );
};

export default Payments;
