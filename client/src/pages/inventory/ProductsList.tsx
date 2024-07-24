import React from "react";
import { useNavigate } from "react-router";

type ContainerData = {
  country: string;
  Port: string;
  size: string;
  type: string;
  condition: string;
  Stocks: string;
  price: string;
};

const ProductsList: React.FC = () => {
  const islogin = false;
  const data: ContainerData[] = [
    {
      country: "Australia",
      Port: "melbourne",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
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
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "50ft",
      type: "Tanks",
      condition: "New",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Sri Lanka",
      Port: "Coloumbo",
      size: "20ft",
      type: "Tanks",
      condition: "IIcl",
      Stocks: "24",
      price: "2500",
    },
  ];
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
  const goToSelectedCountry = () => {
    navigate("/buy/inventory/filteredcountry");
  };
  return (
    <>
      <div className="items grid sm:grid-cols-2 w-full gap-10 ">
        {groupedData.map((item, index) => (
          <div
            className="flex flex-col justify-between border rounded-xl"
            onClick={goToSelectedCountry}
          >
            <div key={index} className="w-full p-6 flex flex-col gap-7  ">
              <div className="flex gap-2">
                <div className="flex">
                  <img src="location.svg" className="self-center" alt="" />
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
              <div className="flex flex-col justify-center">
                <div className="flex mt-3">
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
                <div className="flex mt-3">
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
                <div className="flex mt-3">
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
            <div className="px-6 py-4 flex justify-center items-center  gap-2  ">
              {!islogin ? (
                <>
                  <div className="bg-gray-50 flex px-6 py-4 w-full justify-between items-center">
                    <div className="stocks">
                      <h2 className="text-2xl text-[#BAB8B8]">In Stocks</h2>
                    </div>
                    <div className="view">
                      <a href="" className=" btn btn-secondbtn text-xs  ">
                        Login to view
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-6 py-4 text-center text-xl text-[#003759] self-center bg-gray-50 w-full ">
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
    </>
  );
};

export default ProductsList;
