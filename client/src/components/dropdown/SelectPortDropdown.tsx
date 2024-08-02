import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPort } from "../../store/slice/inventory";
import Select from "react-select";

type Option = {
  label: string;
  value: string;
};

type ContainerData = {
  country: string;
  Port: string;
  size: string;
  type: string;
  condition: string;
  Stocks: string;
  price: string;
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
  const containerData: ContainerData[] = [
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
      country: "Srilanka",
      Port: "agra",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
  ];
  const [data, setData] = useState<ContainerData[]>(containerData);

  useEffect(() => {
    console.log(selectedCountry, "selectcountry");
    if (selectedCountry.label) {
      const filteredData = containerData.filter(
        (item) => selectedCountry.label === item.country
      );
      setData(filteredData);
    } else {
      setData(containerData);
    }
  }, [selectedCountry]);
  const uniquePort: { [key: string]: boolean } = {};

  const port: Option[] = data.reduce((acc: Option[], item) => {
    const { Port } = item;
    if (!uniquePort[Port]) {
      uniquePort[Port] = true;
      acc.push({
        label: Port,
        value: Port.toLowerCase().replace(/\s+/g, ""),
      });
    }
    return acc;
  }, []);

  const handleChange = (selected: ValueType<Option, true>) => {
    dispatch(setselectedPort(selected as Option));
  };
  console.log(selectedPort, ":port", selectedCountry, ":countries");
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
        options={port}
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
