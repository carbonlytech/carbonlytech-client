import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";

interface Props{
    energyData: any[];
}

const GraphOfEnergy: React.FC<Props> = ({energyData}) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
    const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  return (
    <div>
      {/* Enerji Tüketimi */}
      <div className={chartWrapperClass}>
        <h2 className="text-xl font-semibold text-gray-700">Enerji Tüketimi</h2>
        <PieChart width={300} height={200}>
          <Pie
            data={energyData}
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
            dataKey="value"
          >
            {energyData && energyData.map((entry:any, index:any) => (
              <Cell
                key={`energy-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default GraphOfEnergy;
