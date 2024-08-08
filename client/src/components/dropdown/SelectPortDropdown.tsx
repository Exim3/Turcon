import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPort } from "../../store/slice/inventory";
import Select from "react-select";
import axios from "axios";

type Option = {
  label: string;
  value: string;
};

type SelectPortDropdown = {
  multi: boolean;
};

const SelectPortDropdown: React.FC<SelectPortDropdown> = ({ multi }) => {
  const dispatch = useAppDispatch();
  const selectedPort = useAppSelector(
    (state) => state.CountryFilter.selectedPort
  );
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry || null
  );

  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    fetchPort();
  }, [selectedCountry]);
  const fetchPort = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/containers/getcountry",
        {
          params: {
            country: selectedCountry.label,
          },
        }
      );
      console.log("containers", result);
      setData(result.data.ports);
    } catch (error) {}
  };
  const ports = data;
  const handleChange = (selected: ValueType<Option, true>) => {
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
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      "&:hover": {
        backgroundColor: state.isSelected ? "#ddd" : "#f2f2f2",
      },
    }),
  };

  return (
    <div className="w-full">
      <Select
        options={ports}
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
