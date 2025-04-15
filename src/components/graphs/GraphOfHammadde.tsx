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

interface Props {
  hammaddeData: any[];
}

const GraphOfHammadde: React.FC<Props> = ({ hammaddeData }) => {

    const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  return (
    <div className={chartWrapperClass}>
      <h2 className="text-xl font-semibold text-gray-700">
        Hammadde Kullanımı
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={hammaddeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="miktar" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphOfHammadde;
