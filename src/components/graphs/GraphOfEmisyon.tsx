import React from "react";
import {
  Tooltip,
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

  const checkData = (data: any[]) => {
    return data.some(
      (item) =>
        item.name &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        !isNaN(item.miktar) &&
        item.miktar > 0,
    );
  };

  const answer = checkData(emisyonData);

  return (
    <div className={chartWrapperClass}>
      <h2 className="text-xl font-semibold text-gray-700">Emisyon Dağılımı</h2>
      {answer ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={emisyonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="miktar" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div>
          Hammade grafiği için kullanıcı tarafından yeterli veri girilmedi.
        </div>
      )}
    </div>
  );
};

export default GraphOfEmisyon;
