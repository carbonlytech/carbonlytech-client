"use client";
import {
  deleteCarbonDetails,
  getOneCarbonDetails,
} from "@/app/api/carbondetailsService";
import GraphOfAtık from "@/components/graphs/GraphOfAtık";
import GraphOfEmisyon from "@/components/graphs/GraphOfEmisyon";
import GraphOfEnergy from "@/components/graphs/GraphOfEnergy";
import GraphOfHammadde from "@/components/graphs/GraphOfHammadde";
import GraphOfYakit from "@/components/graphs/GraphOfYakit";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CBAMPdfReport from "@/components/pdf/CompanyPresentation";
import Link from "next/link";
import Navbar from "@/components/navbar/page";
import domtoimage from "dom-to-image";
import CBAMReportPdf from "@/components/pdf/CBAMReportPdf";
import CompanyPresentation from "@/components/pdf/CompanyPresentation";

const Detail = () => {
  const [carbonDetail, setCarbonDetail] = useState<any>();
  const params = useParams();
  const formDataId = params.slug;

  const chartRefs = {
    energy: React.useRef(null),
    yakit: React.useRef(null),
    hammadde: React.useRef(null),
    emisyon: React.useRef(null),
    atik: React.useRef(null),
  };

  const [chartImages, setChartImages] = useState<any>({});

  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const generateChartImages = async () => {
      const refs = chartRefs;
      const images: any = {};

      for (const key in refs) {
        const node = refs[key as keyof typeof refs]?.current;
        if (node) {
          const dataUrl = await domtoimage.toPng(node);
          images[key] = dataUrl;
        }
      }

      setChartImages(images);
      setImagesReady(true); // 🎯 Grafikler hazır
    };

    setTimeout(() => {
      if (carbonDetail) generateChartImages();
    }, 3000);
  }, [carbonDetail]);

  useEffect(() => {
    const fetchFormDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getOneCarbonDetails(token, formDataId);
      setCarbonDetail(data);
    };

    fetchFormDetail();
  }, []);

  if (!carbonDetail)
    return <div className="text-center mt-10">Yükleniyor...</div>;

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

  const hammaddeData = carbonDetail.yakitHammadde.hammaddeler.map(
    (item: any) => ({
      name: item.ad,
      miktar: parseFloat(item.miktar),
    }),
  );

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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await deleteCarbonDetails(carbonDetail._id, token);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex gap-x-[5vw]">
        <div className="w-[12%] sticky top-0 h-screen bg-white shadow-md">
          <Navbar />
        </div>

        <div className="w-[80%] pt-[1%]">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            Karbon Ayak İzi Analiz Paneli
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              href={`/detail/update/${formDataId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ✏️ Güncelle
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Sil
            </button>

            {imagesReady ? (
              <PDFDownloadLink
                document={
                  <CompanyPresentation
                    data={carbonDetail}
                    chartImages={chartImages}
                  />
                }
                fileName={`CBAM_Raporu_${carbonDetail.firma.urun}.pdf`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {({ loading }) =>
                  loading ? "Hazırlanıyor..." : "📈 Presentation"
                }
              </PDFDownloadLink>
            ) : (
              <div className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                📄 Grafikler Yükleniyor...
              </div>
            )}

            <PDFDownloadLink
              document={<CBAMReportPdf data={carbonDetail} />}
              fileName={`CBAM_Raporu_${carbonDetail.firma.urun}.pdf`}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              📄Cbam Report
            </PDFDownloadLink>
          </div>

          {/* Firma Bilgisi */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📋 Firma ve Süreç Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base">
              <p>
                <strong>Lokasyon:</strong> {carbonDetail.firma.lokasyon}
              </p>
              <p>
                <strong>Sektör:</strong> {carbonDetail.firma.sektor}
              </p>
              <p>
                <strong>Ürün:</strong> {carbonDetail.firma.urun}
              </p>
              <p>
                <strong>Üretim Miktarı:</strong> {carbonDetail.firma.miktar}{" "}
                {carbonDetail.firma.birim}
              </p>
              <p>
                <strong>Üretim Dönemi:</strong> {carbonDetail.firma.uretimDonem}
              </p>
              <p>
                <strong>CBAM Kapsamı:</strong>{" "}
                {carbonDetail.firma.cbam ? "Evet" : "Hayır"}
              </p>
              <p>
                <strong>Toplam Karbon Ayak İzi:</strong>{" "}
                {carbonDetail.karbonAyakIzi.toLocaleString()} kg CO₂e
              </p>
              <p>
                <strong>Emisyon Süreci:</strong>{" "}
                {carbonDetail.emisyon.surecTipi}
              </p>
              <p>
                <strong>Emisyon Faktörü:</strong>{" "}
                {carbonDetail.emisyon.emisyonFaktoru}
              </p>
              <p>
                <strong>Elektrik Kaynağı:</strong>{" "}
                {carbonDetail.enerji.elektrikKaynak}
              </p>
              <p>
                <strong>Elektrik Dönemi:</strong>{" "}
                {carbonDetail.enerji.elektrikDonem}
              </p>
              <p>
                <strong>Doğalgaz Dönemi:</strong>{" "}
                {carbonDetail.enerji.dogalgazDonem}
              </p>
              <p>
                <strong>Yakıt Türü:</strong>{" "}
                {carbonDetail.yakitHammadde.yakitlar
                  .map((y: any) => y.tip)
                  .join(", ")}
              </p>
              <p>
                <strong>Hammadde Türü:</strong>{" "}
                {carbonDetail.yakitHammadde.hammaddeler
                  .map((h: any) => h.ad)
                  .join(", ")}
              </p>
              <p>
                <strong>Atık Tipi:</strong>{" "}
                {carbonDetail.atikGeriDonusum.atikTipi}
              </p>
              <p>
                <strong>Toplam Atık:</strong>{" "}
                {carbonDetail.atikGeriDonusum.atikMiktari} ton
              </p>
              <p>
                <strong>Geri Dönüşüm Oranı:</strong> %
                {carbonDetail.atikGeriDonusum.geriDonusumOrani}
              </p>
            </div>
          </div>

          {/* Grafikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              ref={chartRefs.energy}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🔌 Enerji Tüketimi
              </h3>
              <GraphOfEnergy energyData={energyData} />
            </div>
            <div
              ref={chartRefs.yakit}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🔥 Yakıt Kullanımı
              </h3>
              <GraphOfYakit yakitData={yakitData} />
            </div>
            <div
              ref={chartRefs.hammadde}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🧱 Hammadde Kullanımı
              </h3>
              <GraphOfHammadde hammaddeData={hammaddeData} />
            </div>
            <div
              ref={chartRefs.emisyon}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🌫️ Emisyon Dağılımı
              </h3>
              <GraphOfEmisyon emisyonData={emisyonData} />
            </div>
            <div
              ref={chartRefs.atik}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                ♻️ Atık & Geri Dönüşüm
              </h3>
              <GraphOfAtık atikData={atikData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
