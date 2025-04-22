import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  atikData: any[];
}

const GraphOfAtık: React.FC<Props> = ({ atikData }) => {
  const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const checkData = (data: any[]) => {
    return data.some(
      (item) =>
        item.name &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        typeof item.value === "number" &&
        !isNaN(item.value) &&
        item.value > 0
    );
  };

  const answer = checkData(atikData);

  return (
    <div className={chartWrapperClass}>
      <h2 className="text-xl font-semibold text-gray-700">Atık & Geri Dönüşüm</h2>
      {answer ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={atikData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
              dataKey="value"
            >
              {atikData.map((entry, index) => (
                <Cell
                  key={`atik-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div>Kullanıcı tarafından yeterli atık verisi girilmedi.</div>
      )}
    </div>
  );
};

export default GraphOfAtık;
