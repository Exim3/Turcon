import React from "react";
import unauthorized from "/unauthorized.svg";
import { Link } from "react-router-dom";

const UnAuthorization: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center  ">
        <div className="p-5">
          <div className="flex flex-col items-center max-w-sm text-center gap-4">
            <div className="">
              <img src={unauthorized} alt="unauthorized" />
            </div>
            <p className="text-[#655F5F]">
              You do not have permission to access this page on the Turcon
              website.Please check your login status .
            </p>
            <button className=" text-primary font-semibold w-full">
              <Link to={"/"}>Back To Home</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnAuthorization;
