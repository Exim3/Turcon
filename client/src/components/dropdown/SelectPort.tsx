type Option = {
  label: string;
  value: string;
};

type SelectPort = {
  multi: boolean;
};

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPorts } from "../../store/slice/inventory";
import Select from "react-select";
import axios from "axios";

const SelectPort: React.FC<SelectPort> = ({ multi }) => {
  const dispatch = useAppDispatch();
  const selectedPorts = useAppSelector(
    (state) => state.CountryFilter.selectedPorts
  );
  const selectedCountries = useAppSelector(
    (state) => state.CountryFilter.selectedCountries
  );

  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    fetchPort();
  }, [selectedCountries]);
  const fetchPort = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/containers/getcountry",
        {
          params: {
            countries: selectedCountries.map((c) => c.label).join(","),
          },
        }
      );
      console.log("containers", result);
      setData(result.data.ports);
    } catch (error) {}
  };

  const ports = data;

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
