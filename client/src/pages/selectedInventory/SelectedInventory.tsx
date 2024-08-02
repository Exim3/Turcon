import React, { useState } from "react";
import SelectCountryDropdown from "../../components/dropdown/SelectCountryDropdown";
import SelectPortDropdown from "../../components/dropdown/SelectPortDropdown";
import Filter from "../../components/filterBox/Filter";
import SelectedContainer from "./SelectedContainer";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import { useBack } from "../../utils/useBack";

const SelectedInventory: React.FC = () => {
  const [search, setSearch] = useState<boolean>(true);
  const ContainerCounts = useAppSelector(
    (state) => state.ContainerCounts.TotalSelectedContainer
  );
  console.log(ContainerCounts, "counts");

  const handleBack = useBack();

  const handleSearchToggle = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  return (
    <>
      <div className="heading mx-auto container text-[#0B0A0A]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className=" flex flex-col gap-2">
              <div className="text-3xl ">Inventory</div>
              <div className="text-xs">
                <Link to={"/"}>home</Link> / Inventory
              </div>
            </div>
            <div className="btn btn-secondbtn">
              <button onClick={handleBack}>back</button>
            </div>
          </div>

          <div className="flex flex-col  gap-4 mb-4">
            <div className=" flex flex-col xs:flex-row  items-center justify-between gap-3 px-2 shadow-[0_0px_3px_0px_rgba(0,0,0,0.25)] ">
              <div className="w-full lg:flex">
                <div className="lg:w-1/2 p-2   ">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <div>
                      <img src={"/global.svg"} alt="" />
                    </div>
                    <SelectCountryDropdown multi={false} />
                  </div>
                </div>
                <div className="lg:w-1/2 p-2  ">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <div>
                      <img src={"/location.svg"} alt="" />
                    </div>
                    <SelectPortDropdown multi={false} />
                  </div>
                </div>
              </div>
              <div className="flex xs:flex-col justify-between md:justify-center items-center w-full xs:w-auto">
                <div
                  className="btn btn-prime self-center"
                  onClick={handleSearchToggle}
                >
                  search
                </div>
                <div className=" p-3 flex lg:hidden">
                  <img src="/filter.svg" alt="" className="self-center" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-end text-[#A5A1A1;]">{`${ContainerCounts} Found result`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="child flex gap-10">
          <div className="hidden lg:block filter w-1/3 border">
            <Filter />
          </div>
          <div className="mx-auto lg:w-3/4 ">
            <SelectedContainer searched={search} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedInventory;
