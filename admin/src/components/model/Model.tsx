import React from "react";

type ModelProps = {
  primaryText: string;
  subText?: string;
  yesText: string;
  noText: string;
  img?: string;
  onYes: () => void;
  onNo: () => void;
};

const Model: React.FC<ModelProps> = ({
  img,
  yesText,
  noText,
  onYes,
  onNo,
  primaryText,
  subText,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        aria-label="Close register"
        role="button"
        tabIndex={0}
      ></div>
      <div className="fixed inset-0 z-50 flex  ">
        <div className=" w-full h-screen flex items-center justify-center ">
          <div className="p-5">
            <div className="flex flex-col px-6 py-4 bg-[#FFF2F4] max-w-[460px] rounded-xl text-center gap-3">
              {img && (
                <div className="flex items-center justify-center">
                  {" "}
                  <img src={img} alt="" />
                </div>
              )}
              <p className="text-2xl font-semibold">{primaryText}</p>
              <p className="text-sm">{subText}</p>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={onYes}
                  className="btn btn-secondbtn bg-[#FFF2F4] w-1/2"
                >
                  {yesText}
                </button>
                <button onClick={onNo} className="btn btn-prime w-1/2">
                  {noText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
