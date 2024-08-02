import React from "react";
import { useNavigate } from "react-router";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center  ">
          <img
            src="/pagenotfound.svg"
            alt=""
            className="self-center object-contain h-dvh "
          />
          <div className="absolute top-[42%] lg:top-[42%]  text-center">
            <p className=" text-[36px] lg:text-[46px] font-semibold ">
              404 <p className=" text-[24px] lg:text-2xl block">oops. . .</p>{" "}
              <p className="text-xs flex-col gap-3 flex lg:text-xl text-gray-600">
                The page was not found{" "}
                <div
                  className="btn btn-prime max-w-24 self-center h-8 min-h-8"
                  onClick={goBack}
                >
                  Go Back
                </div>
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
