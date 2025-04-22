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
  yakitData: any[];
}

const GraphOfYakit: React.FC<Props> = ({ yakitData }) => {
  const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  const checkData = (data: any[]) => {
    return data.some(
      (item) =>
        item.name &&
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        !isNaN(item.miktar) &&
        item.miktar > 0
    );
  };

  const answer = checkData(yakitData);

  return (
    <div className={chartWrapperClass}>
      <h2 className="text-xl font-semibold text-gray-700">Yakıt Tüketimi</h2>
      {answer ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={yakitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="miktar" fill="#8884d8" />
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

export default GraphOfYakit;
