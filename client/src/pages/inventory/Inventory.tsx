import React, { useState } from "react";
import Filter from "../../components/filterBox/Filter";
import { Link } from "react-router-dom";
import SelectPort from "../../components/dropdown/SelectPort";
import SelectCountry from "../../components/dropdown/SelectCountry";
import ProductsList from "./ProductsList";
import { useAppSelector } from "../../store/store";
import { useBack } from "../../utils/useBack";

const Inventory: React.FC = () => {
  const [search, setSearch] = useState<boolean>(true);

  const handleBack = useBack();
  const handleSearchToggle = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  const ContainerCount = useAppSelector(
    (state) => state.ContainerCounts.TotalInventoryContainer
  );
  console.log(ContainerCount);

  return (
    <>
      <div className="heading mx-auto container text-[#0B0A0A]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className=" flex flex-col gap-2">
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

          <div className="flex flex-col  gap-4 mb-4">
            <div className=" flex flex-col xs:flex-row  items-center justify-between gap-3 p-2 shadow-[0_0px_3px_0px_rgba(0,0,0,0.25)] ">
              <div className="w-full lg:flex">
                <div className="lg:w-1/2 p-2   ">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <div>
                      <img src={"/global.svg"} alt="" />
                    </div>
                    <SelectCountry multi={true} />
                  </div>
                </div>
                <div className="lg:w-1/2 p-2  ">
                  <div className="lg:w-full flex items-center px-3 bg-[#fafbfc]">
                    <div>
                      <img src={"/location.svg"} alt="" />
                    </div>
                    <SelectPort multi={true} />
                  </div>
                </div>
              </div>
              <div className="flex xs:flex-col justify-between  items-center w-full xs:w-auto gap-6">
                <div
                  className="btn btn-prime self-center"
                  onClick={handleSearchToggle}
                >
                  search
                </div>{" "}
                <div className=" p-3 flex lg:hidden items-center">
                  <img src="/filter.svg" alt="" className="self-center" />
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-end text-[#A5A1A1;]">{`${ContainerCount} Found result`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="child flex gap-10">
          <div className="hidden lg:block filter w-1/3 ">
            <Filter />
          </div>
          <div className="mx-auto lg:w-3/4 ">
            <ProductsList searched={search} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
