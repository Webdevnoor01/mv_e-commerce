import {
  AiFillDashboard,
  AiOutlineShoppingCart,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";
import { BsCurrencyDollar, BsChat } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";

import shortid from "shortid";
export const allNav = [
  {
    id: shortid.generate(),
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: shortid.generate(),
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: shortid.generate(),
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: shortid.generate(),
    title: "Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: shortid.generate(),
    title: "Payment request",
    icon: <BsCurrencyDollar />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: shortid.generate(),
    title: "Deactive Sellers",
    icon: <FiUsers />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: shortid.generate(),
    title: "Sellers Request",
    icon: <BiLoaderCircle />,
    role: "admin",
    path: "/admin/dashboard/seller-requests",
  },
  {
    id: shortid.generate(),
    title: "Chat Seller",
    icon: <CiChat1 />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },
  {
    id: shortid.generate(),
    title: "Dashboard",
    icon: <AiFillDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: shortid.generate(),
    title: "Add Product",
    icon: <AiOutlinePlus />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: shortid.generate(),
    title: "All Product",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: shortid.generate(),
    title: "Discount Product",
    icon: <RiProductHuntLine />,
    role: "seller",
    path: "/seller/dashboard/discount-products",
  },
  {
    id: shortid.generate(),
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: shortid.generate(),
    title: "Payments",
    icon: <BsCurrencyDollar />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: shortid.generate(),
    title: "Chat Customer",
    icon: <BsChat />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: shortid.generate(),
    title: "Chat Support",
    icon: <CiChat1 />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
  {
    id: shortid.generate(),
    title: "Profile",
    icon: <FiUsers />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];
