import React from "react";

import HandShakeAnimation from "../../components/handshake/HandShakeAnimation";

const RegisterSuccess: React.FC = () => {
  const name = localStorage.getItem("register");
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center">
        <div className="p-5 my-auto ">
          <div className="py-6  bg-white border rounded-xl px-5 lg:px-8 gap-3 flex flex-col justify-center w-full sm:w-[556px] mx-auto relative text-center ">
            <p className="text-3xl font-semibold">Welcome {name ? name : ""}</p>
            <div className="max-w-52 mx-auto">
              <HandShakeAnimation />
            </div>
            <p className="text-2xl  font-semibold  text-[#383434]">
              Register Completed
            </p>
            <p className="text-sm text-[#4e4949]">
              You're all set to explore our inventory and begin
              <span className="block ">purchasing containers.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSuccess;
