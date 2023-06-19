import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// react-icons
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

// components
import Card from "../../../components/card";
import DashboardChart from "../../../components/chart";
import RecentChatItem from "../../../components/rectnt-chat-item";
import Table from "../../../components/table";
const AdminDashboard = () => {
  const tableOption = {
    thead: ["Order Id", "Price", "Order Status", "payment Status", "Action"],
    tbody: {
      data1: {
        td: [
          "#lsdfjdsfalkjfs",
          250,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
        ],
      },
      data2: {
        td: [
          "#lsdfjdsfalkjfs",
          700,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
        ],
      },
      data3: {
        td: [
          "#lsdfjdsfalkjfs",
          2500,
          <span> processing </span>,
          <span>Paid</span>,
          <Link>view</Link>,
        ],
      },
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <section className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
        <Card
          title={"Total Sells"}
          value={"$23980"}
          Icon={BsCurrencyDollar}
          bg={"#28c76f1f"}
          tc={"#28c76f"}
        />
        <Card
          title={"Products"}
          value={"30"}
          Icon={RiProductHuntFill}
          bg={"#e000e81f"}
          tc={"#cd00e8"}
        />
        <Card
          title={"Sellers"}
          value={"50"}
          Icon={FaUsers}
          bg={"#00cfe81f"}
          tc={"#00cfe8"}
        />
        <Card
          title={"Orders"}
          value={"100"}
          Icon={AiOutlineShoppingCart}
          bg={"#7367f01f"}
          tc={"#7367f0"}
        />
      </section>

      <section className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <DashboardChart
            orders={[34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45]}
            revenue={[110, 310, 109, 300, 200, 200, 100, 500, 435, 100, 80, 90]}
            sellers={[78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43]}
          />
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0 ">
          <div className="w-full bg-[#283046] p-4 rounded-md  ">
            <div className="flex justify-between items-center  ">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3 ">
                Recent Sellers messages
              </h2>
              <Link className=" font-semibold text-sm text-[#d0d2d6] ">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6] ">
              <ol className="relative border-1 border-slate-600 ml-4">
                <RecentChatItem
                  userImg={"../../images/admin.jpg"}
                  userName={"Admin"}
                  time={"2 days ago"}
                  message={"How are you"}
                />
                <RecentChatItem
                  userImg={"../../images/admin.jpg"}
                  userName={"Abdun Noor"}
                  time={"1 days ago"}
                  message={"Are you available for chat"}
                />
                <RecentChatItem
                  userImg={"../../images/admin.jpg"}
                  userName={"Admin"}
                  time={"1 days ago"}
                  message={"Yes, how can I help you"}
                />
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Table
        tableName={"Recent Orders"}
        to="#"
        thead={tableOption.thead}
        tbodys={tableOption.tbody}
      />
    </div>
  );
};

export default AdminDashboard;
