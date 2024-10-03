import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ViewIcon } from "../../../components/svg/Tick";
import axiosInstance from "../../../utils/axiosInstance";
import debounce from "lodash.debounce";

type SellerData = {
  _id: string;
  sellerName: string;
  containers: [object];
  contactPerson: [object];
  address: string;
};

const Sellers: React.FC = () => {
  const [sellers, setSellers] = useState<SellerData[]>([]);
  const [filter, setFilter] = useState({
    sellerName: "",
  });
  const [error, setError] = useState<string>("");
  const fetchSellers = useCallback(
    debounce(async (filter: { sellerName: string }) => {
      try {
        const response = await axiosInstance.get("/api/seller/get", {
          params: {
            sellerName: filter.sellerName,
          },
        });
        setSellers(response.data?.sellers || []);
      } catch (error) {
        console.error("Error fetching sellers:", error);
        setError("Failed to fetch sellers.");
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchSellers(filter);
  }, [filter, fetchSellers]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  return (
    <>
      <div className="bg-[#F1F1F1]">
        <AdminHeader title={"Sellers"} />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6 h-screen ">
        <div className="px-4 py-3 flex  justify-between items-center bg-[white] rounded-md gap-6 w-full shadow-[0px_0px_12px_rgb(0,0,0,.2)]">
          <div className="flex items-center justify-between w-full ">
            <p className="text-2xl font-semibold">Sellers</p>
            <div className="flex items-center gap-8">
              <div className="relative ">
                <input
                  type="input"
                  placeholder="Search by seller Name"
                  name="sellerName"
                  onChange={handleInputChange}
                  value={filter.sellerName}
                  className="input input-bordered mx-auto placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
                <button>
                  <Search
                    sx={{
                      color: "#655F5F",
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
              <Link
                className="btn bg-primary text-white rounded"
                to={"/sellers/addSeller"}
              >
                + Add Seller
              </Link>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 text-center">{error}</div>}

        {sellers?.length > 0 ? (
          <div className="grid grid-cols-2 gap-y-6 gap-x-8">
            {sellers.map((seller) => (
              <div
                className="w-full  px-1  shadow-[0px_0px_12px_rgb(0,0,0,.2)] rounded-xl"
                style={{
                  background: "linear-gradient(to bottom, #9a0000, #005e99)",
                }}
              >
                <div className="bg-white w-full h-full rounded-lg flex items-center px-4 py-3 justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#383434]">Seller Name</p>
                    <span className="font-semibold">{seller.sellerName}</span>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <p className="text-[#383434]">Contact Persons</p>
                    <span className="text-center font-semibold">
                      {seller.contactPerson.length}
                    </span>
                  </div>
                  <Link
                    to={`/viewSeller/${seller._id}`}
                    className="w-10 h-10 flex items-center justify-center bg-[#FFFAF5] rounded-md"
                  >
                    <ViewIcon size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full border gap-4">
            <h2 className="text-sm text-[#888888] text-center ">
              The Seller lists are empty . <br />
              Please Add new Seller to start your Inventory
            </h2>
            <div className="btn btn-prime bg-[#aaaaaa] hover:bg-[#bbbbbb]">
              {" "}
              Add Seller
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sellers;
