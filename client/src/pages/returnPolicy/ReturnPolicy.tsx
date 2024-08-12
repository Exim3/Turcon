import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy: React.FC = () => {
  return (
    <>
      <div className="bg-my-gradient">
        <div className="container mx-auto flex flex-col gap-8 ">
          <div className="flex justify-between items-center mt-4">
            <div className=" flex flex-col gap-2">
              <div className="text-xl md:text-3xl text-[#0B0A0A] ">
                Return Policy
              </div>
              <div className="text-[10px] md:text-sm text-[#7A7474]">
                <Link to={"/"}>Home / </Link>
                <span className="font-semibold text-[#0B0A0A]">
                  Return Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
