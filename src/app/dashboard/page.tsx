"use client";
import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import { useRouter } from "next/navigation";

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
    let totalCarbonTemp = 0;

    allDetails.forEach((formData) => {
      const miktar = parseFloat(formData.firma.miktar || "0");
      totalProductionTemp += miktar;

      const elektrikKg = Number(formData.enerji?.elektrikMiktar || 0) * 0.4;
      const dogalgazKg = Number(formData.enerji?.dogalgazMiktar || 0) * 2.0;

      const yakitKg = (formData.yakitHammadde?.yakitlar || []).reduce(
        (toplam: number, yakit: any) => toplam + Number(yakit.miktar || 0) * 2.5,
        0
      );

      const emisyonKg =
        Number(formData.emisyon?.co2 || 0) +
        Number(formData.emisyon?.ch4 || 0) * 25 +
        Number(formData.emisyon?.n2o || 0) * 298;

      const toplamKarbon = elektrikKg + dogalgazKg + yakitKg + emisyonKg;

      totalCarbonTemp += toplamKarbon;
    });

    setTotalProduction(totalProductionTemp);
    setTotalCarbonFootprint(totalCarbonTemp);
  }, [allDetails]);

  const navigateToDetail = (id: any) => {
    router.push(`detail/${id}`);
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Paneli</h1>

      <div className="bg-gray-100 p-4 rounded-xl mb-8 w-full max-w-3xl text-center space-y-2">
        <p>Toplam Ürün: <strong>{allDetails.length}</strong></p>
        <p>Toplam Üretim Miktarı: <strong>{totalProduction}</strong></p>
        <p>Toplam Karbon Ayak İzi: <strong>{totalCarbonFootprint.toFixed(2)} kg CO₂</strong></p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {Array.isArray(allDetails) &&
          allDetails.map((formData: any, index: number) => {
            const elektrikKg = Number(formData.enerji?.elektrikMiktar || 0) * 0.4;
            const dogalgazKg = Number(formData.enerji?.dogalgazMiktar || 0) * 2.0;
            const yakitKg = (formData.yakitHammadde?.yakitlar || []).reduce(
              (toplam: number, yakit: any) => toplam + Number(yakit.miktar || 0) * 2.5,
              0
            );
            const emisyonKg =
              Number(formData.emisyon?.co2 || 0) +
              Number(formData.emisyon?.ch4 || 0) * 25 +
              Number(formData.emisyon?.n2o || 0) * 298;

            const toplamKarbon = elektrikKg + dogalgazKg + yakitKg + emisyonKg;
            const miktar = parseFloat(formData.firma.miktar || "0");
            const karbonYoğunluk = miktar > 0 ? toplamKarbon / miktar : 0;

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {formData.firma.urun}
                      {formData.firma.cbam && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          CBAM
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500">{formData.firma.lokasyon} · {formData.firma.sektor}</p>
                  </div>
                  <button
                    onClick={() => navigateToDetail(formData._id)}
                    className="text-blue-600 underline text-sm"
                  >
                    Report and Graph
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div><strong>Üretim Miktarı:</strong> {formData.firma.miktar} {formData.firma.birim}</div>
                  <div><strong>Üretim Dönemi:</strong> {formData.firma.uretimDonem}</div>
                  <div><strong>Toplam Karbon:</strong> {toplamKarbon.toFixed(2)} kg CO₂</div>
                  <div><strong>Karbon Yoğunluğu:</strong> {karbonYoğunluk.toFixed(2)} kg CO₂/ton</div>
                  <div><strong>Elektrik:</strong> {elektrikKg.toFixed(2)} kg CO₂</div>
                  <div><strong>Doğalgaz:</strong> {dogalgazKg.toFixed(2)} kg CO₂</div>
                  <div><strong>Yakıtlar:</strong> {yakitKg.toFixed(2)} kg CO₂</div>
                  <div><strong>Proses Emisyonları:</strong> {emisyonKg.toFixed(2)} kg CO₂</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
