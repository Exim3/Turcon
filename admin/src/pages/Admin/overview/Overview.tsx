import React from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import groupuserIcon from "/groupUser.svg";
import containerIcon from "/containerAIcon.svg";
import userCart from "/cartIcon.svg";
import increaseIcon from "/increaseIcon.svg";
import decreaseIcon from "/decreaseIcon.svg";
import Bar from "../../../components/charts/bar/Bar";
import { ExportIcon } from "../../../components/svg/Tick";
import Pie from "../../../components/charts/pie/Pie";
import Geo from "../../../components/charts/geo/Geo";
import ContactFormTable from "../forms/contact/ContactFormTable";
import RecentOrderTable from "../forms/recentOrder/RecentOrderTable";
import CarrersTable from "../forms/carrers/CarrersTable";

const Overview: React.FC = () => {
  return (
    <>
      <div className="bg-white ">
        <AdminHeader title={"Overview"} />
      </div>

      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6">
        <div className="flex items-center gap-8">
          {/* boxes */}
          <div className="px-6 py-3 gap-2 flex flex-col bg-white rounded-xl flex-grow shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2">
              <div>
                <img src={groupuserIcon} alt="" />
              </div>
              <h4 className="font-semibold">Total Users</h4>
            </div>
            <h3 className="text-4xl font-semibold">15400</h3>
            <div className="flex items-center gap-2">
              <div className="bg-[#8DF7E6] flex items-center gap-1 py-[2px] px-1 rounded-md text-[#0E8773]">
                <span className="text-xs font-semibold">300+</span>
                <img src={increaseIcon} alt="" />
              </div>
              <p className="text-[12px] text-[#7A7474]">
                Compared with previous month data
              </p>
            </div>
          </div>
          <div className="px-6 py-3 gap-2 flex flex-col bg-white rounded-xl flex-grow shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2">
              <div>
                <img src={containerIcon} alt="" />
              </div>
              <h4 className="font-semibold">Containers Stocks</h4>
            </div>
            <h3 className="text-4xl font-semibold">400</h3>
            <div className="flex items-center gap-2">
              <div className="bg-[#8DF7E6] flex items-center gap-1 py-[2px] px-1 rounded-md text-[#0E8773]">
                <span className="text-xs font-semibold">0.8%</span>
                <img src={increaseIcon} alt="" />
              </div>
              <p className="text-[12px] text-[#7A7474]">
                Compared with previous month data
              </p>
            </div>
          </div>
          <div className="px-6 py-3 gap-2 flex flex-col bg-white rounded-xl flex-grow shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2">
              <div>
                <img src={userCart} alt="" />
              </div>
              <h4 className="font-semibold">Total Orders</h4>
            </div>
            <h3 className="text-4xl font-semibold">231</h3>
            <div className="flex items-center gap-2">
              <div className="bg-[#F78D98] flex items-center gap-1 py-[2px] px-1 rounded-md text-[#870E1A]">
                <span className="text-xs font-semibold">0.8%</span>
                <img src={decreaseIcon} alt="" />
              </div>
              <p className="text-[12px] text-[#7A7474]">
                Compared with previous month data
              </p>
            </div>
          </div>
        </div>

        {/* charts */}

        <div className="w-full flex justify-between ">
          {/* bar */}
          <div className="w-3/5 border bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between px-6 py-3 ">
              <div className="flex items-center gap-8  w-full ">
                <h3 className="text-2xl font-semibold">Sales Overview</h3>
                <select
                  defaultValue={""}
                  className="select select-bordered  w-full max-w-[100px] focus:border active:border focus:outline-none "
                >
                  <option>Month</option>
                  <option>Week</option>
                  <option>Year</option>
                </select>
              </div>
              <div className="px-3 ">
                <button className="w-full flex items-center gap-2 bg-[#8DF7E6] rounded-md p-3">
                  <span className="text-[#0E8773]">export</span>{" "}
                  <ExportIcon color="#0E8773" />
                </button>
              </div>
            </div>

            <div className="w-full ">
              <Bar />
            </div>
          </div>
          {/* pie */}
          <div className="w-[38%] border bg-white rounded-xl  py-4 shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
            <div className="flex gap-2 items-center w-full justify-center ">
              <h3 className="text-2xl">Order Status</h3>
              <p className="bg-[#F7C78D] text-sm  font-semibold my-2 flex items-center gap-1 rounded-md px-1 ">
                <span className="text-xl">231</span> <span>Orders</span>
              </p>
            </div>
            <div className="w-full ">
              <Pie />
            </div>
            <div className="flex flex-col gap-1 py-1">
              <div className="text-sm flex items-center justify-between px-6 text-[#00B3FF]">
                <p className="">Invoice(25%)</p>
                <span>58</span>
              </div>
              <div className="text-sm flex items-center justify-between px-6 text-[#0E2087]">
                <p className="">Processing(25%)</p>
                <span>58</span>
              </div>
              <div className="text-sm flex items-center justify-between px-6 text-[#C03744]">
                <p className="">Order Cancelled(20%)</p>
                <span>46</span>
              </div>
              <div className="text-sm flex items-center justify-between px-6 text-[#15B097]">
                <p className="">Product Collected(30%)</p>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
        {/* geo */}
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <div className="px-6 py-4">
            <p className="text-2xl font-semibold">Country-wise User Count</p>
          </div>
          <div className="divider m-0 p-0 "></div>
          <Geo />
        </div>
        {/* Recent Order */}
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <div className="px-4 py-3">
            <p className="text-2xl font-semibold">Recent Order</p>
          </div>
          <div>
            <RecentOrderTable />
          </div>
        </div>
        {/* Contact Form */}
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <div className="px-4 py-3">
            <p className="text-2xl font-semibold">Contact Form</p>
          </div>
          <div>
            <ContactFormTable />
          </div>
        </div>
        {/* Carrers Form */}
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <div className="px-4 py-3">
            <p className="text-2xl font-semibold">Carrers Form</p>
          </div>

          <div>
            <CarrersTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
