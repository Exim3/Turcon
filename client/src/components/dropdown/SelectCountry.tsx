import React from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedCountries } from "../../store/slice/inventory";
import "./style.css";

interface CountryOption {
  value: string;
  label: string;
}
type ContainerData = {
  country: string;
  Port: string;
  size: string;
  type: string;
  condition: string;
  Stocks: string;
  price: string;
};

type selectCountry = {
  multi: boolean;
};

const SelectCountry: React.FC<selectCountry> = ({ multi }) => {
  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
  );
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
  const data: ContainerData[] = [
    {
      country: "Australia",
      Port: "melbourne",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "Srilanka",
      Port: "melbourne",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
    {
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
  ];
  const uniqueCountries: { [key: string]: boolean } = {};

  const countries: CountryOption[] = data.reduce(
    (acc: CountryOption[], item) => {
      const { country } = item;
      if (!uniqueCountries[country]) {
        uniqueCountries[country] = true;
        acc.push({
          label: country,
          value: country.toLowerCase().replace(/\s+/g, ""),
        });
      }
      return acc;
    },
    []
  );

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
