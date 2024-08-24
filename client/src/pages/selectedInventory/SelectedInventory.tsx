import React, { useState } from "react";
import SelectCountryDropdown from "../../components/dropdown/SelectCountryDropdown";
import SelectPortDropdown from "../../components/dropdown/SelectPortDropdown";
import Filter from "../../components/filterBox/Filter";
import SelectedContainer from "./SelectedContainer";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import { useBack } from "../../utils/useBack";
import FilterSideBar from "../../components/filterBox/FilterSideBar";
import filterIcon from "/filter.svg";
import globalIcon from "/global.svg";
import locationIcon from "/location.svg";

const SelectedInventory: React.FC = () => {
  const [search, setSearch] = useState<boolean>(true);
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  const ContainerCounts = useAppSelector(
    (state) => state.ContainerCounts.TotalSelectedContainer
  );

  const handleBack = useBack();

  const handleSearchToggle = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  const ToggleFilter = () => {
    setToggleFilter((prev) => !prev);
  };
  return (
    <>
      {toggleFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={ToggleFilter}
            aria-label="Close Filter Sidebar"
            role="button"
            tabIndex={0}
          ></div>
          <div className="fixed inset-0 z-20 flex top-20 ">
            <div className="relative  w-full sm:w-1/2 bg-white h-full max-h-screen overflow-hidden">
              <FilterSideBar />
              <div className="absolute bottom-0 w-full border bg-white p-4 text-center  ">
                <button
                  className=" bg-secondary text-white py-2 px-4 rounded w-full hover:bg-blue-600 "
                  onClick={ToggleFilter}
                  aria-label="Apply Filters"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="heading mx-auto container text-[#0B0A0A] pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className=" flex flex-col gap-2">
              <div className="text-xl md:text-3xl text-[#0B0A0A]">
                Inventory
              </div>
              <div className="text-[10px] md:text-sm text-[#7A7474]">
                <Link to={"/"}>home</Link> /{" "}
                <span className="text-[#0B0A0A] font-semibold">Inventory </span>
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
                      <img src={globalIcon} alt="global" />
                    </div>
                    <SelectCountryDropdown multi={false} />
                  </div>
                </div>
                <div className="lg:w-1/2 p-2  ">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <div>
                      <img src={locationIcon} alt="location" />
                    </div>
                    <SelectPortDropdown multi={false} />
                  </div>
                </div>
              </div>
              <div className="flex xs:flex-col justify-between md:justify-center items-center w-full xs:w-auto gap-6">
                <div
                  className="btn btn-prime self-center"
                  onClick={handleSearchToggle}
                >
                  search
                </div>
                <div className=" p-3 flex lg:hidden" onClick={ToggleFilter}>
                  <img src={filterIcon} alt="filter" className="self-center" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-end text-[#A5A1A1;]">{`${ContainerCounts} Found result`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-2">
        <div className="child flex gap-10">
          <div className="hidden lg:block filter w-1/3 ">
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
