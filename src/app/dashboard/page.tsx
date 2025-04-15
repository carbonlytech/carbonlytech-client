"use client"

import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const Dashboard: React.FC = () => {
  const router = useRouter();

  const [allDetails, setAllDetails] = useState<any[]>([]);
  const [totalProduction, setTotalProduction] = useState<number>(0);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const carbonData = await getCarbonDetails(token);
      setAllDetails(carbonData);
    };

    getData();
  }, []);

  useEffect(() => {
    let totalProductionTemp = 0;
    let totalCarbonFootprintTemp = 0;

    allDetails.forEach((formData) => {
      const miktar = parseFloat(formData.firma.miktar || "0");
      totalProductionTemp += miktar;

      const toplamKarbon = parseFloat(formData.karbonAyakIzi || "0");
      totalCarbonFootprintTemp += toplamKarbon;
    });

    setTotalProduction(totalProductionTemp);
    setTotalCarbonFootprint(totalCarbonFootprintTemp);
  }, [allDetails]);

  const karbonPerUrun = allDetails.map((item) => ({
    name: item.firma.urun,
    value: item.karbonAyakIzi,
  }));

  return (
    <div className="bg-gray-100 min-h-screen w-full p-8">
      <div className="w-full max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Paneli</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-xl">Toplam Ürün</div>
            <div className="text-4xl font-semibold text-center">{allDetails.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-xl">Toplam Üretim</div>
            <div className="text-4xl font-semibold text-center">{totalProduction} ton</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-xl">Toplam Karbon Ayak İzi</div>
            <div className="text-4xl font-semibold text-center">{totalCarbonFootprint.toFixed(2)} kg</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="text-xl">CBAM Uyumlu</div>
            <div className="text-4xl font-semibold text-center">
              {allDetails.filter(item => item.firma.cbam).length}
            </div>
          </div>
        </div>

        {/* Chart & List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Karbon Dağılımı (Ürünlere Göre)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={karbonPerUrun}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {karbonPerUrun.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow overflow-auto max-h-[400px]">
            <h2 className="text-xl font-semibold mb-4">Son Kayıtlar</h2>
            {allDetails.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">{item.firma.urun}</div>
                  <div className="text-sm text-gray-500">{item.firma.lokasyon}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.karbonAyakIzi} kg CO₂</div>
                  <button
                    onClick={() => router.push(`/detail/${item._id}`)}
                    className="text-blue-500 text-sm underline"
                  >
                    Detay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
