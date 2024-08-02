import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { SetSelectedCount } from "../../store/slice/containerCount";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type ContainerData = {
  id: string;
  country: string;
  Port: string;
  size: string;
  type: string;
  condition: string;
  Stocks: string;
  price: string;
};

type SelectedContainerProps = {
  searched: boolean;
};

const SelectedContainer: React.FC<SelectedContainerProps> = ({ searched }) => {
  const containerData: ContainerData[] = [
    {
      id: "3",
      country: "Australia",
      Port: "melbourne",
      size: "40FT",
      type: "Dry",
      condition: "Reefers",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "2",
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "Scrab",
      condition: "OpenTop",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "1",
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "New",
      condition: "Dry",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "4",
      country: "India",
      Port: "Delhi",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "6",
      country: "SriLanka",
      Port: "Coloumbo",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "7",
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "8",
      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "9",

      country: "Srilanka",
      Port: "agra",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "10",

      country: "SriLanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      id: "11",
      country: "Srilanka",
      Port: "Coloumbo",
      size: "20ft",
      type: "Tanks",
      condition: "IIcl",
      Stocks: "24",
      price: "2500",
    },
  ];

  const [data, setData] = useState<ContainerData[]>(containerData);
  const [filteredData, setFilteredData] = useState<ContainerData[]>(data);
  const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const dispatch = useAppDispatch();

  const selectedPort = useAppSelector(
    (state) => state.CountryFilter.selectedPort
  );
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry
  );
  const condition = useAppSelector((state) => state.Filter.condition);
  const type = useAppSelector((state) => state.Filter.type);
  const size = useAppSelector((state) => state.Filter.size);

  useEffect(() => {
    let results = data;

    if (selectedCountry.label) {
      results = results.filter(
        (container) => container.country === selectedCountry.label
      );
    }

    if (selectedPort.label) {
      results = results.filter(
        (container) => container.Port === selectedPort.label
      );
    }

    const selectedConditions = Object.keys(condition).filter(
      (key) => condition[key]
    );
    if (selectedConditions.length) {
      results = results.filter((item) =>
        selectedConditions.includes(item.condition)
      );
    }

    const selectedTypes = Object.keys(type).filter((key) => type[key]);
    if (selectedTypes.length) {
      results = results.filter((item) => selectedTypes.includes(item.type));
    }

    const selectedSizes = Object.keys(size).filter((key) => size[key]);
    if (selectedSizes.length) {
      results = results.filter((item) => selectedSizes.includes(item.size));
    }

    setFilteredData(results);
  }, [searched, size, type, condition, data]);

  useMemo(() => {
    dispatch(SetSelectedCount(filteredData.length));
  }, [filteredData, dispatch]);

  const updateCartCount = (id: string, increment: boolean) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [id]: increment
        ? (prevCounts[id] || 0) + 1
        : Math.max((prevCounts[id] || 0) - 1, 0),
    }));
  };

  // Pagination logic
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {paginatedData.length > 0 ? (
        <div>
          <div className="items grid sm:grid-cols-2 w-full gap-10">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-4 gap-2 bg-[#FAFAFA] rounded-lg"
              >
                <div className="w-full">
                  <img src="/containerTypes1.png" alt="Container" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <h3 className="text-2xl font-semibold text-[#0B0A0A]">
                    {`${item.size} ${item.type}`}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="chip text-sm">New</div>
                    <div className="qty text-sm">Qty: {item.Stocks}</div>
                  </div>
                  <div className="price flex justify-between items-center">
                    <div className="value text-[#15B097] text-2xl">
                      {item.price}
                    </div>
                    <div className="flex justify-center text-center font-semibold items-center">
                      <button
                        className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
                        onClick={() => updateCartCount(item.id, false)}
                        aria-label={`Decrease quantity for ${item.size} ${item.type}`}
                      >
                        -
                      </button>
                      <div className="w-8 h-8 p-1 cursor-pointer">
                        {cartCounts[item.id] || 0}
                      </div>
                      <button
                        className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
                        onClick={() => updateCartCount(item.id, true)}
                        aria-label={`Increase quantity for ${item.size} ${item.type}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center justify-between">
                    <button className="btn w-1/2 btn-prime">Add To Cart</button>
                    <button className="btn w-1/2 btn-secondbtn">
                      Connect Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Stack spacing={2} className="mt-4">
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
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
              <img src="/noResult.svg" alt="No Results" />
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

export default SelectedContainer;
