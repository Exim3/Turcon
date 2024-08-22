import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import cancelIcon from "/x.svg";
import Logo from "/logo.svg";

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full">
      <div className="p-5">
        <div className="py-6 border px-5 lg:px-8 gap-3 flex flex-col justify-center w-full sm:w-[556px] mx-auto relative">
          <div className="w-28 mx-auto">
            <img src={Logo} alt="Logo" />
          </div>
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer absolute top-3 right-3 bg-[#e4e4e4] w-8 h-8 flex items-center justify-center rounded-md"
          >
            <img src={cancelIcon} alt="Cancel" />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Register;

export const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="form-group flex flex-col gap-3">
    <label className="block w-full">{label}</label>
    {children}
  </div>
);
