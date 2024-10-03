import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// Define the type for your data
type WeeklyData = {
  day: string;
  previousweek: number;
  currentweek: number;
};

const data: WeeklyData[] = [
  { day: "sun", currentweek: 150, previousweek: 80 },
  { day: "mon", currentweek: 130, previousweek: 400 },
  { day: "tues", currentweek: 150, previousweek: 109 },
  { day: "wed", currentweek: 150, previousweek: 170 },
  { day: "thu", currentweek: 130, previousweek: 180 },
  { day: "fri", currentweek: 120, previousweek: 70 },
  { day: "sat", currentweek: 180, previousweek: 160 },
];

const Bar: React.FC = () => {
  // Function to set colors based on the id
  const getBarColor = (datum: { id: string | number }) => {
    const id = datum.id as string; // Ensure id is treated as a string
    switch (id) {
      case "currentweek":
        return "#9A0000"; // primary
      case "previousweek":
        return "#005E99"; //secondary
      default:
        return "#888888";
    }
  };

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["currentweek", "previousweek"]}
        indexBy="day"
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        colors={getBarColor} // Apply the color function here
        groupMode="grouped"
        borderRadius={2}
        innerPadding={2}
        enableLabel={false}
        enableGridX={true}
        enableGridY={true}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Day",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Users Added",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        role="img"
        ariaLabel="Bar chart showing weekly user additions"
        barAriaLabel={({ id, value, indexValue }) =>
          `${id}: ${value} users added on ${indexValue}`
        }
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: -30,
            translateY: -45,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Bar;
