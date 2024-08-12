import React from "react";

type About = {
  title: string;
  topTitle: string;
  content: string;
  imageUrl: string;
};

const AboutBox: React.FC<About> = ({ title, topTitle, content, imageUrl }) => {
  return (
    <>
      <div className="grid lg:grid-cols-2 justify-center p-4 gap-8 lg:mx-9">
        <div className="flex flex-col gap-3 bg-gray-50 max-w-md  p-3 rounded-md">
          <h4 className="text-2xl text-[#9A0000]">{topTitle}</h4>
          <div className="flex  flex-col gap-3">
            <h2 className="text-[28px] font-semibold">{title}</h2>
            <p className="text-[16px]">{content}</p>
          </div>
        </div>
        <div className="mx-auto">
          <img src={imageUrl} alt="flight" />
        </div>
      </div>
    </>
  );
};

export default AboutBox;

export const AboutBoxInvert: React.FC<About> = ({
  title,
  topTitle,
  content,
  imageUrl,
}) => {
  return (
    <>
      <div className="grid lg:grid-cols-2 justify-center p-4 gap-8 lg:mx-9">
        <div className="mx-auto">
          <img src={imageUrl} alt="aboutBanner" />
        </div>
        <div className="flex flex-col gap-3 bg-gray-50 max-w-md  p-3 rounded-md">
          <h4 className="text-2xl text-[#9A0000]">{topTitle}</h4>
          <div className="flex  flex-col gap-3">
            <h2 className="text-[28px] font-semibold">{title}</h2>
            <p className="text-[16px]">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
};
