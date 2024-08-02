import React from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedCountry } from "../../store/slice/inventory";
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

type SelectCountryDropdown = {
  multi: boolean;
};

const SelectCountryDropdown: React.FC<SelectCountryDropdown> = ({ multi }) => {
  const selectedCountry = useAppSelector(
    (state) => state.CountryFilter.selectedCountry
  );
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

  const country: CountryOption[] = data.reduce((acc: CountryOption[], item) => {
    const { country } = item;
    if (!uniqueCountries[country]) {
      uniqueCountries[country] = true;
      acc.push({
        label: country,
        value: country.toLowerCase().replace(/\s+/g, ""),
      });
    }
    return acc;
  }, []);

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
