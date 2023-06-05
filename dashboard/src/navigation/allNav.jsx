import { AiFillDashboard, AiOutlineShopping } from "react-icons/ai";

import shortid from "shortid";
export const allNavs = [
  {
    id: shortid.generate(),
    title: "Dashboard",
    icon: <AiFillDashboard />,
    path: "/admin/dashboard",
    role: ["admin"],
  },
  {
    id: shortid.generate(),
    title: "Orders",
    icon: <AiOutlineShopping />,
    path: "/admin/orders",
    role: ["admin"],
  },
];
