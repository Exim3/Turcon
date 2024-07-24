import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./style.css";

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
const MultiselectPort: React.FC = () => {
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

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleChange = (selected: Option[]) => {
    setSelectedOptions(selected);
  };
  return (
    <div className="w-full">
      <MultiSelect
        options={ports}
        value={selectedOptions}
        onChange={handleChange}
        labelledBy={"Select"}
        hasSelectAll={false}
      />
    </div>
  );
};

export default MultiselectPort;
