import React, { useEffect, useState } from "react";
import Select, { SingleValue, MultiValue, GroupBase } from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedCountries } from "../../store/slice/inventory";

import "./style.css";
import axiosInstance from "../../utils/axiosInstance";

interface CountryOption {
  value: string;
  label: string;
}

type SelectCountryProps = {
  multi: boolean;
};

const SelectCountry: React.FC<SelectCountryProps> = ({ multi }) => {
  const dispatch = useAppDispatch();
  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
  );
  const [data, setData] = useState<CountryOption[]>([]);

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      const result = await axiosInstance.get("/api/containers/getcountry");
      setData(result.data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
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

  const handleChange = (
    selectedOptions: SingleValue<CountryOption> | MultiValue<CountryOption>
  ) => {
    if (multi) {
      dispatch(setSelectedCountries(selectedOptions as CountryOption[]));
    } else {
      dispatch(setSelectedCountries(selectedOptions as CountryOption[]));
    }
  };

  return (
    <div className="w-full">
      <Select<CountryOption, boolean, GroupBase<CountryOption>>
        options={data}
        value={selectedCountries}
        onChange={handleChange}
        isMulti={multi}
        placeholder="Select Countries"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectCountry;
