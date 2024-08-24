import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPort } from "../../store/slice/inventory";
import Select, { SingleValue, MultiValue, GroupBase } from "react-select";

import axiosInstance from "../../utils/axiosInstance";

type Option = {
  label: string;
  value: string;
};

type SelectPortDropdownProps = {
  multi: boolean;
};

const SelectPortDropdown: React.FC<SelectPortDropdownProps> = ({ multi }) => {
  const dispatch = useAppDispatch();
  const selectedPort = useAppSelector(
    (state) => state.CountryFilter.selectedPort
  );
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry || null
  );

  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      fetchPort();
    }
  }, [selectedCountry]);

  const fetchPort = async () => {
    try {
      const result = await axiosInstance.get("/api/containers/getcountry", {
        params: {
          country: selectedCountry.label,
        },
      });
      setData(result.data.ports);
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

  const handleChange = (selected: SingleValue<Option> | MultiValue<Option>) => {
    dispatch(setselectedPort(selected as Option));
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#fafbfc",
      border: "none",
      boxShadow: "none",
      height: "56px",
      "&:hover": {
        border: "none",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px",
      color: "#aaa",
      "@media (max-width: 768px)": {
        fontSize: "12px",
      },
    }),
    option: (provided: any, state: { isSelected: boolean }) => ({
      ...provided,
      "&:hover": {
        backgroundColor: state.isSelected ? "#ddd" : "#f2f2f2",
      },
    }),
  };

  return (
    <div className="w-full">
      <Select<Option, boolean, GroupBase<Option>>
        options={data}
        value={selectedPort}
        onChange={handleChange}
        isMulti={multi}
        placeholder="Select Port"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectPortDropdown;
