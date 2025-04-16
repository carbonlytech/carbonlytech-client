"use client";
import { getOneCarbonDetails } from "@/app/api/carbondetailsService";
import GraphOfAtık from "@/components/graphs/GraphOfAtık";
import GraphOfEmisyon from "@/components/graphs/GraphOfEmisyon";
import GraphOfEnergy from "@/components/graphs/GraphOfEnergy";
import GraphOfHammadde from "@/components/graphs/GraphOfHammadde";
import GraphOfYakit from "@/components/graphs/GraphOfYakit";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import CBAMPdfReport from "@/components/pdf/CBAMPdfReport";


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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Karbon Ayak İzi Analiz Paneli
      </h1>

      {/* PDF Çıktısı Butonu */}
      <div className="text-center mb-6">
        <PDFDownloadLink
          document={<CBAMPdfReport data={carbonDetail} />}
          fileName={`CBAM_Raporu_${carbonDetail.firma.urun}.pdf`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {({ loading }) => (loading ? "Hazırlanıyor..." : "📄 CBAM PDF Raporunu İndir")}
        </PDFDownloadLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraphOfEnergy energyData={energyData} />
        <GraphOfYakit yakitData={yakitData} />
        <GraphOfHammadde hammaddeData={hammaddeData} />
        <GraphOfEmisyon emisyonData={emisyonData} />
        <GraphOfAtık atikData={atikData} />
      </div>
    </div>
  );
};

export default Detail;
