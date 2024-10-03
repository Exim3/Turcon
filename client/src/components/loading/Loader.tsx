import React from "react";
import LoadingAnimation from "./Loading";

const Loader: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          aria-label="Close Filter Sidebar"
          role="button"
          tabIndex={0}
        ></div>

        <div className="absolute z-10 left-1/2 -translate-x-1/2    ">
          <div className="w-32">
            <LoadingAnimation />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
