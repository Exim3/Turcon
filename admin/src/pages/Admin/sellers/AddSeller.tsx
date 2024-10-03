import React, { ChangeEvent, useState } from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

interface Data {
  sellerName: string;
  address: string;
}

const AddSeller: React.FC = () => {
  const [data, setData] = useState<Data>({
    sellerName: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const addSeller = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/seller/add", data);
      const msg = response.data?.message;
      if (msg) toast.success(msg);
      navigate("/sellers");
      setData({
        sellerName: "",
        address: "",
      });
    } catch (error: any) {
      console.log(error);
      setError(error.response.data?.error);
    } finally {
      setLoading(false);
    }
  };
  const HandleSubmit = () => {
    const { sellerName, address } = data;
    console.log(data);
    if (!sellerName) return setError("Company Name should not be empty");
    if (!address) return setError("Address  should not be empty");
    setError("");
    addSeller();
  };
  return (
    <>
      {" "}
      <div className="bg-[#F1F1F1]">
        <AdminHeader title={"Sellers"} />
      </div>
      {/* seller form */}
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6 h-screen">
        <div className="px-4 py-3 flex flex-col justify-between items-center bg-[white] rounded-md gap-6">
          <div className="flex flex-col  gap-4 w-full">
            <p className="text-2xl font-semibold">Seller Details</p>
            <p className="text-xl font-semibold text-center">
              Seller Company Details
            </p>
            <div className="flex-col flex gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-semibold">
                  Supplier Company Name
                </label>
                <input
                  type="text"
                  name={"sellerName"}
                  value={data?.sellerName}
                  placeholder="Enter Supplier Company Name"
                  onChange={handleChangeInput}
                  className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-semibold">
                  Company Address{" "}
                </label>
                <input
                  type="text"
                  name={"address"}
                  onChange={handleChangeInput}
                  value={data?.address}
                  placeholder="Enter Your Company Address"
                  className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded-sm"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 ">{error}</p>}
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="btn rounded-[4px] bg-[#D7F0FF] text-secondary"
              to={"/sellers"}
            >
              Cancel
            </Link>
            <button
              className="btn rounded-[4px] bg-secondary text-white"
              onClick={HandleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-bars loading-sm  bg-secondary"></span>
              ) : (
                "Add Seller"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSeller;
