import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setSelectedCountry,
  setselectedPort,
} from "../../store/slice/inventory";
import { SetInventoryCount } from "../../store/slice/containerCount";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type ContainerData = {
  country: string;
  Port: string;
  size: string;
  type: string;
  condition: string;
  Stocks: string;
  price: string;
};

type ProductsListProps = {
  searched: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({ searched }) => {
  const islogin = true;
  const containerData: ContainerData[] = [
    {
      country: "Australia",
      Port: "melbourne",
      size: "40ft",
      type: "Dry",
      condition: "Reefers",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "India",
      Port: "Delhi",
      size: "40ft",
      type: "New",
      condition: "Tanks",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "SriLanka",
      Port: "Coloumbo",
      size: "40ft",
      type: "Dry",
      condition: "OverFlat",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "OpenTop",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "New",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Srilanka",
      Port: "Coloumbo",
      size: "20ft",
      type: "Tanks",
      condition: "IIcl",
      Stocks: "24",
      price: "2500",
    },
  ];

  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
  );
  const selectedPorts = useAppSelector(
    (state) => state.CountryFilter.selectedPorts
  );
  const condition = useAppSelector((state) => state.Filter.condition);
  const type = useAppSelector((state) => state.Filter.type);
  const size = useAppSelector((state) => state.Filter.size);
  const [data, setData] = useState<ContainerData[]>(containerData);

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    filterData();
  }, [searched, condition, type, size]);

  const filterData = () => {
    let result = containerData; // Start with the original data

    if (selectedCountries.length > 0) {
      result = result.filter((item) =>
        selectedCountries.some((country) => country.label === item.country)
      );
    }

    if (selectedPorts.length > 0) {
      result = result.filter((item) =>
        selectedPorts.some((port) => port.label === item.Port)
      );
    }

    const conditions = Object.keys(condition).filter((key) => condition[key]);
    if (conditions.length > 0) {
      result = result.filter((item) => conditions.includes(item.condition));
    }

    const types = Object.keys(type).filter((key) => type[key]);
    if (types.length > 0) {
      result = result.filter((item) => types.includes(item.type));
    }

    const sizes = Object.keys(size).filter((key) => size[key]);
    if (sizes.length > 0) {
      result = result.filter((item) => sizes.includes(item.size));
    }

    setData(result);
  };

  const groupedData: ContainerData[] = Object.values(
    data.reduce((acc: { [key: string]: ContainerData }, item) => {
      const key = `${item.country}-${item.Port}`;
      if (!acc[key]) {
        acc[key] = { ...item }; // Initialize with current item
      } else {
        // Aggregate Stocks
        acc[key].Stocks = (
          parseInt(acc[key].Stocks) + parseInt(item.Stocks)
        ).toString();
      }
      return acc;
    }, {})
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useMemo(() => {
    dispatch(SetInventoryCount(groupedData.length));
  }, [groupedData, dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedData = groupedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const goToSelectedCountry = (Port: string, country: string) => {
    dispatch(setSelectedCountry({ label: country, value: country }));
    dispatch(setselectedPort({ label: Port, value: Port }));
    navigate(`${islogin ? "/buy/selectedInventory" : "/login"}`);
  };

  return (
    <>
      {paginatedData.length > 0 ? (
        <div>
          <div className="items grid sm:grid-cols-2 w-full gap-10">
            {paginatedData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between border p-6 gap-4 rounded-xl"
                onClick={() => goToSelectedCountry(item.Port, item.country)}
              >
                <div key={index} className="w-full flex flex-col gap-6">
                  <div className="flex gap-2">
                    <div className="flex">
                      <img src="/location.svg" className="self-center" alt="" />
                    </div>
                    <div>
                      <h2 className="text-3xl">
                        {item.Port}
                        <span className="text-xl text-[#7A7474]">
                          {" "}
                          {item.country}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="flex">
                      <p className="font-semibold">Type:</p>
                      <ul className="flex flex-wrap px-2">
                        {data
                          .filter(
                            (i) =>
                              i.country === item.country && i.Port === item.Port
                          )
                          .map((filteredItem, filteredIndex) => (
                            <li
                              key={filteredIndex}
                              className="chip inline-block m-1"
                            >
                              {filteredItem.type}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">Size:</p>
                      <ul className="flex flex-wrap px-2">
                        {data
                          .filter(
                            (i) =>
                              i.country === item.country && i.Port === item.Port
                          )
                          .map((filteredItem, filteredIndex) => (
                            <li
                              key={filteredIndex}
                              className="chip inline-block m-1"
                            >
                              {filteredItem.size}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">Condition:</p>
                      <ul className="flex flex-wrap px-2">
                        {data
                          .filter(
                            (i) =>
                              i.country === item.country && i.Port === item.Port
                          )
                          .map((filteredItem, filteredIndex) => (
                            <li
                              key={filteredIndex}
                              className="chip inline-block m-1"
                            >
                              {filteredItem.condition}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 flex justify-center items-center gap-2">
                  {!islogin ? (
                    <>
                      <div className="flex px-6 py-4 w-full justify-between items-center">
                        <div className="stocks">
                          <h2 className="text-2xl text-[#BAB8B8]">In Stocks</h2>
                        </div>
                        <div className="view">
                          <a href="" className="btn btn-secondbtn text-xs">
                            Login to view
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-6 py-4 text-center text-xl text-[#003759] self-center bg-gray-50 w-full">
                        Available Stocks :{" "}
                        <span className="text-2xl text-[#11a3ff] font-semibold">
                          {item.Stocks}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Stack spacing={2} className="mt-4">
            <Pagination
              count={Math.ceil(groupedData.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      ) : (
        <div className="py-9 lg:py-32">
          <div className="flex flex-col text-sm items-center justify-center gap-6 px-5 text-center lg:w-1/2 mx-auto">
            <div className="w-24">
              <img src="/noResult.svg" alt="" />
            </div>
            <div>
              <p>
                We couldn’t find any containers matching your search criteria.
                Please try adjusting your filters.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsList;
