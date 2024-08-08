import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedCountries } from "../../store/slice/inventory";
import "./style.css";
import axios from "axios";

interface CountryOption {
  value: string;
  label: string;
}

type selectCountry = {
  multi: boolean;
};

const SelectCountry: React.FC<selectCountry> = ({ multi }) => {
  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
  );
  const [data, setData] = useState<CountryOption[]>([]);
  const dispatch = useAppDispatch();

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
        backgroundColor: state.isSelected ? "#ddd" : "#f2f2f2",
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
  const countries = data;

  const handleChange = (selectedOptions: ValueType<CountryOption, true>) => {
    dispatch(setSelectedCountries(selectedOptions as CountryOption[]));
  };

  return (
    <div className="w-full">
      <Select
        options={countries}
        value={selectedCountries}
        onChange={handleChange}
        styles={customStyles}
        isMulti={multi}
        placeholder="Select Countries"
      />
    </div>
  );
};

export default SelectCountry;
