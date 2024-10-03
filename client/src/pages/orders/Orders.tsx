import { Link, NavLink, Outlet } from "react-router-dom";
import * as React from "react";

const Orders: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col  ">
        <div className="flex justify-between items-center mt-4">
          <div className=" flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A] ">Orders</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}>Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">Orders </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 my-4">
          <div className="flex  text-xs lg:text-sm font-semibold  items-center gap-3 lg:gap-4 overflow-x-scroll lg:overflow-auto">
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/all"
            >
              All
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/processing"
            >
              Processing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/invoice"
            >
              Invoice
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/collected"
            >
              Collected
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/cancelled"
            >
              Cancelled
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Orders;
