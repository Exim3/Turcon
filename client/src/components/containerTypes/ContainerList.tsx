import React from "react";
type ContainerProps = {
  imgSrc: string;
  altText: string;
  sizes: string[];
  types: string[];
  containerName: string;
};

const ContainerList: React.FC<ContainerProps> = ({
  imgSrc,
  altText,
  sizes,
  types,
  containerName,
}) => {
  return (
    <>
      <div
        // data-aos="fade-up"
        className="bg-[#FAFAFA] border border-[#cfcece] pt-3 pb-6 px-3 rounded-lg w-full  "
      >
        <div className="img">
          <img src={imgSrc} alt={altText} />
        </div>
        <div className="content">
          <h4 className="text-sm mt-1">{containerName}</h4>
          <div className="flex mt-3">
            <p className="text-xs font-semibold">Size:</p>
            <ul className="flex flex-wrap px-2">
              {sizes.map((size, index) => (
                <li key={index} className="chip inline-block m-1">
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <p className="text-xs font-semibold">Type:</p>
            <ul className="text-xs px-2 list-disc">
              {types.map((type, index) => (
                <li key={index} className="ms-3">
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerList;
