import React from "react";
import MultiSelectDropdown from "../../components/dropdown/MultiSelectDropdown";
import Filter from "../../components/filterBox/Filter";
import { Outlet, useNavigate } from "react-router-dom";
import MultiselectPort from "../../components/dropdown/MultiselectPort";

const Inventory: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="heading mx-auto container text-[#0B0A0A]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className=" flex flex-col gap-2">
              <div className="text-3xl ">Inventory</div>
              <div className="text-xs">home / Inventory</div>
            </div>
            <div className="btn btn-secondbtn">
              <div onClick={handleBack}>back</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <div className=" flex items-center justify-between gap-3 p-2 shadow-[0_0px_3px_0px_rgba(0,0,0,0.25)] ">
              <div className="w-full lg:flex">
                <div className="lg:w-1/2 ">
                  <div className="lg:w-full flex items-center">
                    <div>
                      <img src={"/global.svg"} alt="" />
                    </div>
                    <MultiSelectDropdown />
                  </div>
                </div>

                <div className="border-t-2 lg:border-l-2 lg:border-t-0 lg:w-1/2 ">
                  <div className="lg:w-full flex items-center">
                    <div>
                      <img src={"/location.svg"} alt="" />
                    </div>
                    <MultiselectPort />
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-center items-center ">
                <div className="btn btn-prime self-center">search</div>
                <div className=" p-3 flex lg:hidden">
                  <img src="filter.svg" alt="" className="self-center" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-end text-[#A5A1A1;]">0 Found result</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="child flex gap-10">
          <div className="hidden lg:block filter w-1/3 border">
            <Filter />
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
