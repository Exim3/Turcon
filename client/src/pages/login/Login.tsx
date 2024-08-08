import React, { useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon, { EyeCloseIcon } from "../../components/svg/Eye";
import { BackIcon } from "../../components/svg/Tick";
import { useBack } from "../../utils/useBack";

const Login: React.FC = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const goback = useBack();

  const ToggleEye = () => {
    setIsEyeOpen((prev) => !prev);
  };
  return (
    <>
      <div className="bg-white w-full ">
        <div className="h-8 flex justify-between container">
          <div onClick={goback} className="cursor-pointer">
            <BackIcon color="#232323" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-1/2 lg:rounded-md px-5">
          <div className="py-6 px-8 gap-3 flex flex-col border justify-center max-w-xl mx-auto">
            <div className="w-28 mx-auto">
              <img src="/logo.svg" alt="" />
            </div>
            <div className="body flex flex-col gap-4">
              <div className="text-center text-2xl">Welcome Back</div>
              <div className="flex-col flex gap-2">
                <div className="form-group flex flex-col gap-3 ">
                  <label htmlFor="" className="block w-full">
                    Email/UserName
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email or username "
                    className="input input-bordered w-full placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                  />
                </div>
                <div className="form-group flex flex-col gap-3 ">
                  <label htmlFor="" className="block w-full ">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isEyeOpen ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input input-bordered w-full placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    />
                    <div
                      className="absolute right-3 top-3 cursor-pointer "
                      onClick={ToggleEye}
                    >
                      {isEyeOpen ? (
                        <EyeIcon size={24} />
                      ) : (
                        <EyeCloseIcon size={24} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-end text-xs text-[#9A0000]">
                  Forget Password ?
                </div>
              </div>
            </div>
            <div className="btn btn-prime ">Login</div>
            <div className="end">
              <div className="divider">or</div>
              <div className="text-center text-xs">
                Don't you have an Account ?{" "}
                <span className="text-[#005E99] font-semibold">
                  <Link to={"/register"}> Register</Link>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
