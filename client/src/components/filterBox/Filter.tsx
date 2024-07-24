import React, { useState } from "react";

const Filter: React.FC = () => {
  const size = ["40FT", "20FT", "40FT HC", "20FT HC"];
  const condition = ["Reefers", "Tanks", "Dry", "OpenTop", "FlatTrack"];
  const type = ["Scrab", "Damage", "IICL", "New"];

  // State to track checked state of checkboxes
  const [checkedSize, setCheckedSize] = useState<{ [key: string]: boolean }>({
    "40FT": false,
    "20FT": false,
    "40FT HC": false,
    "20FT HC": false,
  });

  const [checkedCondition, setCheckedCondition] = useState<{
    [key: string]: boolean;
  }>({
    Reefers: false,
    Tanks: false,
    Dry: false,
    OpenTop: false,
    FlatTrack: false,
  });

  const [checkedType, setCheckedType] = useState<{ [key: string]: boolean }>({
    Scrab: false,
    Damage: false,
    IICL: false,
    New: false,
  });

  // Function to handle checkbox change for Size
  const handleSizeCheckboxChange = (size: string) => {
    setCheckedSize((prevState) => ({
      ...prevState,
      [size]: !prevState[size],
    }));
  };

  // Function to handle checkbox change for Condition
  const handleConditionCheckboxChange = (condition: string) => {
    setCheckedCondition((prevState) => ({
      ...prevState,
      [condition]: !prevState[condition],
    }));
  };

  // Function to handle checkbox change for Type
  const handleTypeCheckboxChange = (type: string) => {
    setCheckedType((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  // Function to clear all checkboxes
  const handleClear = () => {
    setCheckedSize({
      "40FT": false,
      "20FT": false,
      "40FT HC": false,
      "20FT HC": false,
    });
    setCheckedCondition({
      Reefers: false,
      Tanks: false,
      Dry: false,
      OpenTop: false,
      FlatTrack: false,
    });
    setCheckedType({
      Scrab: false,
      Damage: false,
      IICL: false,
      New: false,
    });
  };

  return (
    <>
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex">
              {/* Assuming you have an SVG file named filter.svg */}
              <img
                src="/public/filter.svg"
                className="self-center"
                alt="Filter Icon"
              />
            </div>
            <h2 className="text-2xl">Filter</h2>
          </div>
          <div className="p-1">
            {/* Clear button */}
            <div className="btn px-3 py-1" onClick={handleClear}>
              Clear X
            </div>
          </div>
        </div>
        <div className="divider m-0"></div>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex flex-col gap-4 pb-6 border-b-2">
            <h2 className="text-[#4E4949] text-xl">Size</h2>
            <ul className="flex gap-3 flex-wrap">
              {size.map((item, index) => (
                <li key={index} className="p-2 border rounded-md flex gap-1">
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    checked={checkedSize[item]}
                    onChange={() => handleSizeCheckboxChange(item)}
                  />
                  <label htmlFor={`size-${index}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 pb-6 border-b-2">
            <h2 className="text-[#4E4949] text-xl">Type</h2>
            <ul className="flex gap-3 flex-wrap">
              {type.map((item, index) => (
                <li key={index} className="p-2 border rounded-md flex gap-1">
                  <input
                    type="checkbox"
                    id={`type-${index}`}
                    checked={checkedType[item]}
                    onChange={() => handleTypeCheckboxChange(item)}
                  />
                  <label htmlFor={`type-${index}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 pb-6 border-b-2">
            <h2 className="text-[#4E4949] text-xl">Condition</h2>
            <ul className="flex gap-3 flex-wrap">
              {condition.map((conditionItem, index) => (
                <li key={index} className="p-2 border rounded-md flex gap-1">
                  <input
                    type="checkbox"
                    id={`condition-${index}`}
                    checked={checkedCondition[conditionItem]}
                    onChange={() =>
                      handleConditionCheckboxChange(conditionItem)
                    }
                  />
                  <label htmlFor={`condition-${index}`}>{conditionItem}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
