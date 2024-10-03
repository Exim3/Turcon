import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import Model from "../../../components/model/Model";
import { toast } from "react-toastify";

type SellerData = {
  _id: string;
  sellerName: string;
  containers: [object];
  contactPerson: [object];
  address: string;
};
const ViewSeller: React.FC = () => {
  const [sellers, setSellers] = useState<SellerData>();
  const [modal, setModal] = useState<boolean>();
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const fetchSeller = async () => {
    try {
      const response = await axiosInstance.get(`/api/seller/getseller`, {
        params: { sellerId },
      });
      console.log(response);
      setSellers(response.data?.seller);
    } catch (error) {
      console.log("error", error);
    }
  };
  const HandleDeleteSeller = async () => {
    try {
      const response = await axiosInstance.delete("/api/seller/deleteseller", {
        params: {
          sellerId,
        },
      });
      console.log(response);
      if (response.data?.message) {
        const msg = response.data?.message;
        toast.success(msg);
      }
      navigate("/sellers");
    } catch (error: any) {
      console.error(error);
      if (error.response.data?.error) {
        const err = error.response.data?.error;
        toast.error(err);
      }
    }
  };
  useEffect(() => {
    fetchSeller();
  }, []);
  return (
    <>
      {modal && (
        <Model
          primaryText={"Are you sure you want to delete this seller's ID?"}
          subText="If you delete this Id , the contact person and seller's stocks will be permanently removed and cannot be recovered"
          yesText={"Delete"}
          noText={"Cancel"}
          img={"/deleteSeller.svg"}
          onYes={HandleDeleteSeller}
          onNo={() => setModal(false)}
        />
      )}
      <div className="bg-[#F1F1F1] ">
        <AdminHeader
          title={`${sellers?.sellerName}`}
          breadCrums={`sellers / ${""}${sellers?.sellerName}`}
          breadlinks="sellers"
        />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6 h-screen">
        <div className="bg-white p-4 rounded-xl flex items-center justify-between shadow-[0px_0px_4px_rgb(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-[#221F1F] ">
            {sellers?.sellerName}
          </h2>
          <div className="flex flex-col ">
            <h2>Contact Persons</h2>
            <span className="text-center text-[22px]">
              {sellers?.contactPerson.length}
            </span>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-center">Address</h2>
            <span className="text-center font-semibold">
              {sellers?.address}
            </span>
          </div>

          <div>
            <button
              className="btn bg-red-600 text-white hover:bg-red-400"
              onClick={() => setModal(true)}
            >
              delete
            </button>
          </div>
        </div>
        <div className="flex bg-white flex-col gap-3 px-4 py-3 shadow-[0px_0px_4px_rgb(0,0,0,0.2)] rounded-xl capitalize">
          <div className="flex justify-between items-center">
            <Link
              className="btn bg-[#FDC5C5] text-primary rounded"
              to={`/sellers/containers/${sellers?._id}`}
            >
              Stock Inventory
            </Link>
            <Link
              className="btn btn-prime rounded"
              to={`/sellers/containers/${sellers?._id}/addperson`}
            >
              + Add Contact Person
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full  gap-4">
          <h2 className="text-sm text-[#888888] text-center ">
            The Seller's Contact Person lists are empty . <br />
            Please Add new Contact Person.
          </h2>
          <div className="btn btn-prime bg-[#aaaaaa] hover:bg-[#bbbbbb]">
            + Add Contact Person
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSeller;
