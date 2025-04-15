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
  emisyonData: any[];
}

const GraphOfEmisyon: React.FC<Props> = ({ emisyonData }) => {
  const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  return (
    <div className={chartWrapperClass}>
      <h2 className="text-xl font-semibold text-gray-700">Emisyon Dağılımı</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={emisyonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="miktar" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphOfEmisyon;