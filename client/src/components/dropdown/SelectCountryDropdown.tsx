import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedCountry } from "../../store/slice/inventory";
import "./style.css";
import axios from "axios";

interface CountryOption {
  value: string;
  label: string;
}

type SelectCountryDropdown = {
  multi: boolean;
};

const SelectCountryDropdown: React.FC<SelectCountryDropdown> = ({ multi }) => {
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry
  );
  const [data, setData] = useState<CountryOption[]>([]);

  const dispatch = useAppDispatch();
  console.log(selectedCountry, "hii");
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

    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      "&:hover": {
        backgroundColor: state.isSelected ? "#ddd" : "#f2f2f2", // Example: Change background color on hover
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px", // Default font size
      color: "#aaa", // Placeholder color
      "@media (max-width: 768px)": {
        fontSize: "12px", // Adjust font size for smaller screens
      },
    }),
  };
  useEffect(() => {
    fetchCountry();
  }, []);
  const fetchCountry = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/containers/getcountry"
      );
      console.log("containers", result);
      setData(result.data.countries);
    } catch (error) {}
  };
  const country = data;

  const handleChange = (selectedOptions: ValueType<CountryOption, true>) => {
    console.log(selectedOptions);
    dispatch(setSelectedCountry(selectedOptions));
  };

  return (
    <div className="w-full">
      <Select
        options={country}
        value={selectedCountry}
        onChange={handleChange}
        styles={customStyles}
        isMulti={multi}
        placeholder="Select Country"
      />
    </div>
  );
};

export default SelectCountryDropdown;
