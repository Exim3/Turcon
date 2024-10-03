import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../geoData/geoData";
import { Box } from "@mui/material";
import { mockDataGeo as data } from "../geoData/mockDataGeo";

const Geo: React.FC = () => {
  return (
    <div style={{ height: 400 }}>
      <Box width={"100%"} height={"100%"}>
        <ResponsiveChoropleth
          data={data}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={[
            "#ccdfeb",
            "#99bfd6",
            "#669ec2",
            "#337ead",
            "#005e99",
            "#004b7a",
            "#00385c",
            "#00263d",
            "#00131f",
            "#ebcccc",
            "#d79999",
            "#c26666",
            "#ae3333",
            "#9a0000",
            "#7b0000",
            "#5c0000",
            "#3e0000",
            "#1f0000",
          ]}
          domain={[0, 1000000]}
          unknownColor="#f1f1f1"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={90}
          projectionTranslation={[0.5, 0.7]}
          projectionRotation={[0, 0, 1]}
          enableGraticule={true}
          borderWidth={0.2}
          graticuleLineWidth={0} // Adjust if needed
          graticuleLineColor="#dddddd"
          borderColor="blue"
          role="img"
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -50,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "#444444",
              itemOpacity: 0.85,

              symbolSize: 10,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </div>
  );
};

export default Geo;
