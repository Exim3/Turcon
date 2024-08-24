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
import axios from "axios";
import noResultIcon from "/noResult.svg";
import locationIcon from "/location.svg";
import "./style.css";
import axiosInstance from "../../utils/axiosInstance";

type ContainerData = {
  country: string;
  portLocation: string;
  size: string;
  type: string;
  condition: string;
  sizes: string[];
  types: string[];
  conditions: string[];
  stockCount: string;
  price: string;
};

type ProductsListProps = {
  searched: boolean;
};

type ApiResponse = {
  containers: ContainerData[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

const ProductsList: React.FC<ProductsListProps> = ({ searched }) => {
  const [containerData, setContainerData] = useState<ContainerData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [login, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    token && setIsLogin(true);
  }, []);

  const { selectedCountries, selectedPorts } = useAppSelector(
    (state) => state.CountryFilter
  );
  const { condition, type, size } = useAppSelector((state) => state.Filter);

  const conditions = useMemo(
    () => Object.keys(condition).filter((key) => condition[key]),
    [condition]
  );
  const types = useMemo(
    () => Object.keys(type).filter((key) => type[key]),
    [type]
  );
  const sizes = useMemo(
    () => Object.keys(size).filter((key) => size[key]),
    [size]
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchContainers(currentPage);
  }, [currentPage, searched, conditions, sizes, types]);

  const filters = {
    countries: selectedCountries.map((c) => c.label).join(","),
    ports: selectedPorts.map((p) => p.label).join(","),
    sizes: sizes.join(","),
    conditions: conditions.join(","),
    types: types.join(","),
  };

  const fetchContainers = async (page: number) => {
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/api/containers/getpagewise`,
        { params: { ...filters, page, itemsPerPage: 10 } }
      );
      const { containers, totalCount, totalPages } = response.data;
      setContainerData(containers);
      setTotalPages(totalPages);
      setCurrentPage(page);
      dispatch(SetInventoryCount(totalCount));
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.message
        : "An unexpected error occurred";
      setError(message);
      // toast.error(message);
      console.error("Fetch containers error:", err);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setCurrentPage(value);
  };

  const goToSelectedCountry = (Port: string, country: string) => {
    dispatch(setSelectedCountry({ label: country, value: country }));
    dispatch(setselectedPort({ label: Port, value: Port }));
    navigate(`${login ? "/buy/selectedInventory" : "/login"}`);
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {containerData.length > 0 ? (
        <div>
          <div className="items grid sm:grid-cols-2 w-full gap-10 cursor-pointer">
            {containerData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between border p-6 gap-4 rounded-xl"
                onClick={() =>
                  goToSelectedCountry(item.portLocation, item.country)
                }
              >
                <div className="w-full flex flex-col gap-6">
                  <div className="flex gap-2">
                    <div className="flex">
                      <img
                        src={locationIcon}
                        className="self-center"
                        alt="Location Icon"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl">
                        {item.portLocation}
                        <span className="text-xl text-[#7A7474] capitalize">
                          {" "}
                          {item.country.toLowerCase()}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="flex">
                      <p className="font-semibold">Types:</p>
                      <ul className="flex flex-wrap px-2">
                        {item.types.map((type, index) => (
                          <li
                            key={index}
                            className="chip inline-block m-1 capitalize"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">Sizes:</p>
                      <ul className="flex flex-wrap px-2">
                        {item.sizes.map((size, index) => (
                          <li key={index} className="chip inline-block m-1">
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">Conditions:</p>
                      <ul className="flex flex-wrap px-2">
                        {item.conditions.map((condition, index) => (
                          <li key={index} className="chip inline-block m-1">
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {!login ? (
                  <div className="bg-gray-50 px-6 py-4  flex justify-center items-center gap-2">
                    <div className="text-lg text-[#003759]  bg-gray-50 w-1/2">
                      In Stocks
                    </div>
                    <div className="btn btn-secondbtn w-1/2">login</div>
                  </div>
                ) : (
                  <div className="bg-gray-50 flex justify-center items-center gap-2">
                    <div className="px-6 py-4 text-center text-xl text-[#003759] self-center bg-gray-50 w-full">
                      Available Stocks:{" "}
                      <span className="text-2xl text-[#11a3ff] font-semibold">
                        {item.stockCount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Stack spacing={2} className="mt-4 ">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      ) : (
        <div className="py-9 lg:py-32">
          <div className="flex flex-col text-sm items-center justify-center gap-6 px-5 text-center lg:w-1/2 mx-auto">
            <div className="w-24">
              <img src={noResultIcon} alt="No Results Icon" />
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
