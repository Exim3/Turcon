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

type SelectPort = {
  multi: boolean;
};

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPorts } from "../../store/slice/inventory";
import Select from "react-select";

const SelectPort: React.FC<SelectPort> = ({ multi }) => {
  const dispatch = useAppDispatch();
  const selectedPorts = useAppSelector(
    (state) => state.CountryFilter.selectedPorts
  );
  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
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
      country: "India",
      Port: "Nava Sheva",
      size: "40ft",
      type: "Dry",
      condition: "Scrab",
      Stocks: "24",
      price: "2500",
    },
  ];
  const [data, setData] = useState<ContainerData[]>(containerData);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      const filteredData = containerData.filter((item) =>
        selectedCountries.find((country) => country.label === item.country)
      );
      setData(filteredData);
    } else {
      setData(containerData);
    }
  }, [selectedCountries]);
  const uniquePorts: { [key: string]: boolean } = {};

  const ports: Option[] = data.reduce((acc: Option[], item) => {
    const { Port } = item;
    if (!uniquePorts[Port]) {
      uniquePorts[Port] = true;
      acc.push({
        label: Port,
        value: Port.toLowerCase().replace(/\s+/g, ""),
      });
    }
    return acc;
  }, []);

  const handleChange = (selected: ValueType<Option, true>) => {
    dispatch(setselectedPorts(selected as Option[]));
  };
  console.log(selectedPorts, ":port", selectedCountries, ":countries");
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
        value={selectedPorts}
        onChange={handleChange}
        isMulti={multi}
        placeholder="Select Port"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectPort;
