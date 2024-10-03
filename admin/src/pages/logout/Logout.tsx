import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../utils/AuthContext";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const HandleLogout = () => {
    logout();
  };
  const HandleCancel = () => {
    navigate("/");
  };
  const token = localStorage.getItem("adminjwt");
  console.log(token);
  return (
    <>
      <div className="h-screen">
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          aria-label="Close register"
          role="button"
          tabIndex={0}
        ></div>
        <div className="fixed inset-0 z-20 flex left-1/4 top-10 ">
          <div className=" w-full  flex items-center justify-center ">
            <div className="p-5">
              <div className="flex flex-col px-6 py-4 bg-[#FFF2F4] max-w-xs rounded-xl text-center gap-3">
                <p className="text-2xl font-semibold">
                  Are You Sure Want to Logout ?
                </p>
                <p className="text-sm"></p>
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={HandleLogout}
                    className="btn btn-secondbtn bg-[#FFF2F4] w-1/2"
                  >
                    Logout
                  </button>
                  <button
                    onClick={HandleCancel}
                    className="btn btn-prime w-1/2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
