import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "./Line.css";

const LineForcast = ({ dataFetch }) => {

  const useData = dataFetch.slice(0, 7)

  const lineData = [
    {
      id: "whitespace",
      color: "hsl(0.00, 0.05%, 0.87%)",
      data: useData.map((item) => ({
        x: `${item.time}`,
        y: Math.round(item.main.temp),
      })),
    },
  ];



  return (

    <div className="line-chart">
      <ResponsiveLine
        data={lineData}
        margin={{ top: 5, right: 20, bottom: 22, left: 20 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: null,
          legendPosition: "middle",
        }}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        pointSize={1.5}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }}
        pointLabelYOffset={-18}
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default LineForcast;
