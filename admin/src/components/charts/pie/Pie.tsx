import React from "react";
import { ComputedDatum, ResponsivePie } from "@nivo/pie";

// Define some sample data
const data = [
  {
    id: "collected",
    label: "product collected",
    value: 355,
  },
  {
    id: "canceled",
    label: "canceled",
    value: 189,
  },
  {
    id: "processing",
    label: "processing",
    value: 182,
  },
  {
    id: "invoice",
    label: "invoice",
    value: 163,
  },
];

const Pie: React.FC = () => {
  const CustomTooltip: React.FC<{
    datum: ComputedDatum<{ id: string; label: string; value: number }>;
  }> = ({ datum }) => (
    <div
      style={{
        padding: "8px 12px",
        background: "rgba(0, 0, 0, 0.75)",
        color: "white",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "semi-bold",
      }}
    >
      <strong>{datum.label}</strong>: {datum.value}
    </div>
  );
  return (
    <div style={{ height: 300 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.6}
        padAngle={0}
        cornerRadius={3}
        enableArcLabels={true}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={8}
        arcLabelsTextColor="#ffffff"
        borderWidth={1}
        borderColor={"white"}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        activeInnerRadiusOffset={2}
        defs={[
          {
            id: "blue",
            type: "patternDots", // Use patternDots or patternLines
            background: "#00b3ff",
            color: "rgba(255, 255, 255, 0.3)",
            size: 0,
            padding: 1,
            stagger: true,
          },
          {
            id: "red",
            type: "patternLines", // Use patternDots or patternLines
            background: "#c03744",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 0,
            spacing: 10,
          },
          {
            id: "green",
            type: "patternDots", // Use patternDots or patternLines
            background: "#15b095",
            color: "rgba(255, 255, 255, 0.3)",
            size: 0,
            padding: 1,
            stagger: true,
          },
          {
            id: "yellow",
            type: "patternLines", // Use patternDots or patternLines
            background: "#0e2087",
            color: "#0e2087",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: { id: "canceled" },
            id: "red",
          },
          {
            match: { id: "invoice" },
            id: "blue",
          },
          {
            match: { id: "processing" },
            id: "yellow",
          },
          {
            match: { id: "collected" },
            id: "green",
          },
        ]}
        tooltip={CustomTooltip}
      />
    </div>
  );
};

export default Pie;
