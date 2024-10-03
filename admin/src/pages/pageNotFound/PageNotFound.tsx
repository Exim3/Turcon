import React from "react";
import { useNavigate } from "react-router";
import ErrorImg from "/pagenotfound.svg";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="h-screen  flex flex-col justify-center">
          <div className="flex justify-center    items-center   ">
            <img
              src={ErrorImg}
              alt="404 error page"
              className="self-center w-80 "
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-prime max-w-24 self-center h-8 min-h-8 "
              onClick={goBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
