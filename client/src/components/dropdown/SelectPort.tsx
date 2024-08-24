import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setselectedPorts } from "../../store/slice/inventory";
import Select, { SingleValue, MultiValue, GroupBase } from "react-select";

import axiosInstance from "../../utils/axiosInstance";

type Option = {
  label: string;
  value: string;
};

type SelectPortProps = {
  multi: boolean;
};

const SelectPort: React.FC<SelectPortProps> = ({ multi }) => {
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
      const result = await axiosInstance.get("/api/containers/getcountry", {
        params: {
          countries: selectedCountries.map((c) => c.label).join(","),
        },
      });

      setData(result.data.ports);
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
  };

  const handleChange = (selected: SingleValue<Option> | MultiValue<Option>) => {
    if (multi) {
      dispatch(setselectedPorts(selected as Option[]));
    } else {
      dispatch(setselectedPorts(selected as Option[]));
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

  return (
    <div className="w-full">
      <Select<Option, boolean, GroupBase<Option>>
        options={data}
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
