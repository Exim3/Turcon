import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  clearFilters,
  toggleCondition,
  toggleSize,
  toggleType,
} from "../../store/slice/filterSlice";

import filterIcon from "/filter.svg";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { size, condition, type } = useAppSelector((state) => state.Filter);

  const handleSizeCheckboxChange = (size: string) => {
    dispatch(toggleSize(size));
  };

  const handleConditionCheckboxChange = (condition: string) => {
    dispatch(toggleCondition(condition));
  };

  const handleTypeCheckboxChange = (type: string) => {
    dispatch(toggleType(type));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="p-6 flex flex-col shadow-[0px_0px_3px_rgba(0,0,0,0.25)] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="hidden lg:block">
            <img src={filterIcon} className="w-6 h-6" alt="Filter Icon" />
          </div>
          <div className="block lg:hidden">
            <div className="w-6 h-6"></div>
          </div>
          <h2 className="textlg lg:text-2xl">Filter</h2>
        </div>
        <button
          className="btn px-3 py-1 bg-gray-200 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <FilterSection
          title="Size"
          options={Object.keys(size)}
          checkedState={size}
          onChange={handleSizeCheckboxChange}
        />
        <FilterSection
          title="Type"
          options={Object.keys(type)}
          checkedState={type}
          onChange={handleTypeCheckboxChange}
        />
        <FilterSection
          title="Condition"
          options={Object.keys(condition)}
          checkedState={condition}
          onChange={handleConditionCheckboxChange}
        />
      </div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  options: string[];
  checkedState: { [key: string]: boolean };
  onChange: (item: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  checkedState,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b-2">
      <h2 className="text-[#4E4949] text-xl">{title}</h2>
      <ul className="flex gap-3 flex-wrap">
        {options.map((item, index) => (
          <li
            key={index}
            className={`p-2 border rounded-md flex items-center gap-2 cursor-pointer ${
              checkedState[item] ? " bg-[#005e99] " : ""
            }`}
          >
            <input
              type="checkbox"
              id={`${title}-${index}`}
              checked={checkedState[item] || false}
              onChange={() => onChange(item)}
              className="h-6 w-6 border-gray-300 rounded focus:ring-0 hidden cursor-pointer"
            />
            <label
              htmlFor={`${title}-${index}`}
              className={`${checkedState[item] && "text-white"} cursor-pointer`}
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
