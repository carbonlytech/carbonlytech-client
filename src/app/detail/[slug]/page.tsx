"use client";
import { getOneCarbonDetails } from "@/app/api/carbondetailsService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Detail = () => {
  const [carbonDetail, setCarbonDetail] = useState<any>();
  const params = useParams();
  const formDataId = params.slug;

  useEffect(() => {
    const fetchFormDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getOneCarbonDetails(token, formDataId);
      setCarbonDetail(data);
    };

    fetchFormDetail();
  }, []);

  if (!carbonDetail) return <div className="text-center mt-10">Yükleniyor...</div>;

  const energyData = [
    carbonDetail.enerji.elektrikKullaniliyor && {
      name: "Elektrik",
      value: parseFloat(carbonDetail.enerji.elektrikMiktar),
    },
    carbonDetail.enerji.dogalgazKullaniliyor && {
      name: "Doğalgaz",
      value: parseFloat(carbonDetail.enerji.dogalgazMiktar),
    },
    carbonDetail.enerji.komurKullaniliyor && {
      name: "Kömür",
      value: parseFloat(carbonDetail.enerji.komurMiktar),
    },
  ].filter(Boolean);

  const yakitData = carbonDetail.yakitHammadde.yakitlar.map((item: any) => ({
    name: item.tip,
    miktar: parseFloat(item.miktar),
  }));

  const hammaddeData = carbonDetail.yakitHammadde.hammaddeler.map((item: any) => ({
    name: item.ad,
    miktar: parseFloat(item.miktar),
  }));

  const emisyonData = [
    { name: "CO2", miktar: parseFloat(carbonDetail.emisyon.co2) },
    { name: "CH4", miktar: parseFloat(carbonDetail.emisyon.ch4) },
    { name: "N2O", miktar: parseFloat(carbonDetail.emisyon.n2o) },
  ];

  const atikData = [
    {
      name: "Geri Dönüşüm",
      value: parseFloat(carbonDetail.atikGeriDonusum.geriDonusumOrani),
    },
    {
      name: "Atık (Dönüşmeyen)",
      value: 100 - parseFloat(carbonDetail.atikGeriDonusum.geriDonusumOrani),
    },
  ];

  const chartWrapperClass =
    "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center justify-center space-y-4";

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Karbon Ayak İzi Analiz Paneli
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {energyData.map((entry, index) => (
                <Cell key={`energy-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Yakıt Tüketimi */}
        <div className={chartWrapperClass}>
          <h2 className="text-xl font-semibold text-gray-700">Yakıt Tüketimi</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={yakitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="miktar" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hammadde Kullanımı */}
        <div className={chartWrapperClass}>
          <h2 className="text-xl font-semibold text-gray-700">Hammadde Kullanımı</h2>
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

        {/* Emisyon Dağılımı */}
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

        {/* Atık & Geri Dönüşüm */}
        <div className={chartWrapperClass}>
          <h2 className="text-xl font-semibold text-gray-700">Atık & Geri Dönüşüm</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={atikData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
              dataKey="value"
            >
              {atikData.map((entry, index) => (
                <Cell key={`atik-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Detail;
