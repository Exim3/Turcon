import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  AddCartCount,
  SetSelectedCount,
} from "../../store/slice/containerCount";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import BlueContainerImg from "/containerBlue.png";
import noResultImg from "/noResult.svg";
import "./style.css";

type ContainerData = {
  country: string;
  portLocation: string;
  size: string;
  type: string;
  condition: string;
  stockCount: string;
  price: string;
  sellerId: string;
  containerId: string;
};
type CartDetail = {
  containerId: string;
  price: string;
  sellerId: string;
  stockCount: string;
  itemcount: number;
  userId: string;
};

type ApiResponse = {
  containers: ContainerData[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

type SelectedContainerProps = {
  searched: boolean;
};

const SelectedContainer: React.FC<SelectedContainerProps> = ({ searched }) => {
  const [containerData, setContainerData] = useState<ContainerData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>(
    {}
  );

  const selectedPort = useAppSelector(
    (state) => state.CountryFilter.selectedPort
  );
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry
  );
  const UsFormat = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return formattedAmount;
  };
  // Get filter state once
  const filterState = useAppSelector((state) => state.Filter);
  const { condition, type, size } = filterState;

  // Use useMemo to avoid re-calculation on every render
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

  const dispatch = useAppDispatch();

  const fetchContainers = useCallback(
    async (page: number) => {
      try {
        const response = await axios.get<ApiResponse>(
          `http://localhost:5000/api/containers/getselected`,
          {
            params: {
              page,
              itemsPerPage: 10,
              country: selectedCountry.label,
              port: selectedPort.label,
              sizes: sizes.join(","),
              conditions: conditions.join(","),
              types: types.join(","),
            },
          }
        );

        const { containers, totalPages, totalCount } = response.data;
        console.log(response, "find");
        setContainerData(containers);
        setTotalPages(totalPages);
        setCurrentPage(page);
        dispatch(SetSelectedCount(totalCount));
      } catch (err) {
        setError(
          axios.isAxiosError(err) ? err.message : "An unexpected error occurred"
        );
      }
    },
    [searched, conditions, sizes, types]
  );

  useEffect(() => {
    fetchContainers(currentPage);
  }, [searched, currentPage, fetchContainers, conditions]);

  const updateCartCount = (id: string, increment: boolean, stocks?: string) => {
    setCartCounts((prevCounts) => {
      const currentCount = prevCounts[id] || 0;
      const availableStock = Number(stocks);

      const newCount = increment
        ? Math.min(currentCount + 1, availableStock)
        : Math.max(currentCount - 1, 0);

      return {
        ...prevCounts,
        [id]: newCount,
      };
    });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setCurrentPage(value);
  };
  console.log(containerData, "data");
  const userId = "669dfb8fe54022e071ed16fe";
  const addCartItem = async (data: CartDetail) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/addcart`,
        data
      );
      console.log(response);

      setAddedToCart((prevState) => ({
        ...prevState,
        [data.containerId]: true,
      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleAddToCart = (item: ContainerData) => {
    const cartDetails: CartDetail = {
      containerId: item.containerId,
      price: item.price,
      sellerId: item.sellerId,
      stockCount: item.stockCount,
      itemcount: cartCounts[item.containerId] || 0,
      userId,
    };
    addCartItem(cartDetails);
    dispatch(AddCartCount(1));
  };

  return (
    <>
      {error && <p className="error-message">Error: {error}</p>}

      {containerData.length > 0 ? (
        <div>
          <div className="items grid sm:grid-cols-2 w-full gap-10">
            {containerData.map((item) => {
              console.log(item, "item");
              const cartCount = cartCounts[item.containerId] || 0;
              const showContactSales = cartCount > 10; // Condition to show "Contact Sales"
              const isAdded = addedToCart[item.containerId];

              return (
                <div
                  key={item.containerId}
                  className="flex flex-col p-4 gap-2 bg-[#FAFAFA] rounded-lg "
                >
                  <div className="w-full">
                    <img src={BlueContainerImg} alt="Container" />
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <h3 className="text-2xl font-semibold text-[#0B0A0A]">
                      {item.size}{" "}
                      <span className="capitalize text-lg text-gray-700">
                        {" "}
                        {item.type.toLowerCase()} Containers
                      </span>
                    </h3>
                    <div className="flex justify-between items-center">
                      <div className="chip text-sm">
                        {" "}
                        <span className="capitalize"> {item.condition}</span>
                      </div>
                      <div className="qty text-lg">Qty: {item.stockCount}</div>
                    </div>
                    <div className="price flex justify-between items-center">
                      <div className="value text-[#15B097] text-2xl">
                        {UsFormat(Number(item.price))}
                      </div>
                      <div className="flex justify-center text-center font-semibold items-center">
                        <button
                          className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
                          onClick={() =>
                            updateCartCount(
                              item.containerId,
                              false,
                              item.stockCount
                            )
                          }
                          aria-label={`Decrease quantity for ${item.size} ${item.type}`}
                        >
                          -
                        </button>
                        <div className="w-8 h-8 p-1 cursor-pointer">
                          {cartCount}
                        </div>
                        <button
                          className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
                          onClick={() =>
                            updateCartCount(
                              item.containerId,
                              true,
                              item.stockCount
                            )
                          }
                          aria-label={`Increase quantity for ${item.size} ${item.type}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center justify-between">
                      <button
                        className="btn w-1/2 btn-prime"
                        onClick={() => {
                          cartCount && !isAdded && handleAddToCart(item);
                        }}
                      >
                        {isAdded ? "Added" : "Add To Cart"}
                      </button>
                      {showContactSales ? (
                        <button className="btn w-1/2 btn-secondbtn">
                          Contact Sales
                        </button>
                      ) : (
                        <button className="btn w-1/2 btn-secondbtn">
                          Connect Email
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
              <img src={noResultImg} alt="No Results" />
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
