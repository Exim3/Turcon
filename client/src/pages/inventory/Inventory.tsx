import React, { useEffect, useState } from "react";
import Filter from "../../components/filterBox/Filter";
import { Link } from "react-router-dom";
import SelectPort from "../../components/dropdown/SelectPort";
import SelectCountry from "../../components/dropdown/SelectCountry";
import ProductsList from "./ProductsList";
import { useAppSelector } from "../../store/store";
import { useBack } from "../../utils/useBack";
import FilterSideBar from "../../components/filterBox/FilterSideBar";
import globalIcon from "/global.svg";
import locationIcon from "/location.svg";
import filterIcon from "/filter.svg";
import RegisterSuccess from "../register/RegisterSuccess";

const Inventory: React.FC = () => {
  const [IsregisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  useEffect(() => {
    const registered = localStorage.getItem("register");
    if (registered) {
      setIsRegisterSuccess(true);
      setTimeout(() => {
        setIsRegisterSuccess(false);
        localStorage.removeItem("register");
        localStorage.removeItem("user");
      }, 5000);
    }
  }, []);
  const [search, setSearch] = useState<boolean>(true);
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  const handleBack = useBack();
  const handleSearchToggle = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  const ContainerCount = useAppSelector(
    (state) => state.ContainerCounts.TotalInventoryContainer
  );

  const ToggleFilter = () => {
    setToggleFilter((prev) => !prev);
  };

  return (
    <>
      {IsregisterSuccess && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            aria-label="Close register"
            role="button"
            tabIndex={0}
          ></div>
          <div className="fixed inset-0 z-20 flex top-20 ">
            <RegisterSuccess />
          </div>
        </>
      )}
      {toggleFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={ToggleFilter}
            aria-label="Close Filter Sidebar"
            role="button"
            tabIndex={0}
          ></div>
          <div className="fixed inset-0 z-20 flex top-20">
            <div className="relative  w-full sm:w-1/2 bg-white h-full max-h-screen overflow-hidden">
              <FilterSideBar />
              <div className="absolute bottom-0 w-full border bg-white p-4 text-center  ">
                <button
                  className=" bg-secondary text-white py-2 px-4 rounded w-full hover:bg-blue-600  "
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
      <div className="heading mx-auto container text-[#0B0A0A] relative pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="text-xl md:text-3xl text-[#0B0A0A]">
                Inventory
              </div>
              <div className="text-[10px] md:text-sm text-[#7A7474]">
                <Link to={"/"}>home </Link>/{" "}
                <span className="font-semibold text-[#0B0A0A]">Inventory</span>
              </div>
            </div>
            <div className="btn btn-secondbtn">
              <div onClick={handleBack}>back</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col xs:flex-row items-center justify-between gap-3 p-2 shadow-[0_0px_3px_0px_rgba(0,0,0,0.25)]">
              <div className="w-full lg:flex">
                <div className="lg:w-1/2 p-2">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <img src={globalIcon} alt="Global" />
                    <SelectCountry multi={true} />
                  </div>
                </div>
                <div className="lg:w-1/2 p-2">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <img src={locationIcon} alt="Location" />
                    <SelectPort multi={true} />
                  </div>
                </div>
              </div>
              <div className="flex xs:flex-col justify-between items-center w-full xs:w-auto gap-6">
                <div
                  className="btn btn-prime self-center"
                  onClick={handleSearchToggle}
                >
                  search
                </div>
                <div
                  className="p-3 flex lg:hidden items-center "
                  onClick={ToggleFilter}
                >
                  <img src={filterIcon} alt="Filter" className="self-center" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-end text-[#A5A1A1]">{`${ContainerCount} Found result`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-2">
        <div className="child flex gap-10">
          <div className="hidden lg:block filter w-1/3">
            <Filter />
          </div>
          <div className="mx-auto lg:w-3/4">
            <ProductsList searched={search} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
