import React, { FormEvent } from "react";
import CarbonFootprintCalculator from "./CarbonFootprintCalculator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sendCarbonDetails } from "@/app/api/carbondetailsService";

interface Props {
  prevStep: () => void;
  formData: any;
}

const Step6: React.FC<Props> = ({ prevStep, formData }) => {

  const handlePrev = () => {
    prevStep();
  };

  const handleSubmit=async(e:FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const token=localStorage.getItem("token");
    if(!token) return;

    try {
    const data = await sendCarbonDetails(formData, token);
    console.log("Veri başarıyla gönderildi:", data);
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <div className="p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Özet ve Hesaplama</h2>

      {/* Firma Bilgileri Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Firma Bilgileri</h3>
        {/* <p><strong>Firma Adı:</strong> {formData.firma?.ad || "N/A"}</p> */}
        <p><strong>Lokasyon:</strong> {formData.firma?.lokasyon || "N/A"}</p>
        <p><strong>Sektör:</strong> {formData.firma?.sektor || "N/A"}</p>
      </div>

      {/* Üretim Bilgileri Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Üretim Bilgileri</h3>
        <p><strong>Üretilen Ürün:</strong> {formData.firma?.urun || "N/A"}</p>
        <p><strong>Üretim Miktarı:</strong> {formData.firma?.miktar || "N/A"} {formData.firma?.birim || "N/A"}</p>
      </div>

      {/* Enerji Tüketimi Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Enerji Tüketimi</h3>
        <p><strong>Elektrik:</strong> {formData.enerji?.elektrikMiktar} {formData.enerji?.elektrikBirim} ({formData.enerji?.elektrikDonem})</p>
        <p><strong>Doğalgaz:</strong> {formData.enerji?.dogalgazMiktar} {formData.enerji?.dogalgazBirim} ({formData.enerji?.dogalgazDonem})</p>
        <p><strong>Kömür:</strong> {formData.enerji?.komurMiktar || "N/A"} {formData.enerji?.komurBirim || ""}</p>
        <p><strong>Elektrik Kaynağı:</strong> {formData.enerji?.elektrikKaynak || "N/A"}</p>
      </div>

      {/* Yakıt Kullanımı Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Yakıt Kullanımı</h3>
        {(formData.yakitHammadde?.yakitlar || []).map((yakit: any, i: number) => (
          <p key={i}>
            {yakit.tip}: {yakit.miktar} {yakit.birim} ({yakit.donem})
          </p>
        ))}
      </div>

      {/* Hammadde Kullanımı Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Hammadde Kullanımı</h3>
        {(formData.yakitHammadde?.hammaddeler || []).map((madde: any, i: number) => (
          <p key={i}>
            {madde.ad}: {madde.miktar} {madde.birim} ({madde.tedarik})
          </p>
        ))}
      </div>

      {/* Emisyon Verileri Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Emisyon Verileri</h3>
        <p><strong>Süreç Tipi:</strong> {formData.emisyon?.surecTipi || "N/A"}</p>
        <p><strong>Emisyon Faktörü:</strong> {formData.emisyon?.emisyonFaktoru || "N/A"}</p>
        <p><strong>CO₂:</strong> {formData.emisyon?.co2} kg</p>
        <p><strong>CH₄:</strong> {formData.emisyon?.ch4} kg</p>
        <p><strong>N₂O:</strong> {formData.emisyon?.n2o} kg</p>
      </div>

      {/* Atık ve Geri Dönüşüm Kartı */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="font-medium text-green-700 mb-4">Atık & Geri Dönüşüm</h3>
        <p><strong>Atık Tipi:</strong> {formData.atikGeriDonusum?.atikTipi || "N/A"}</p>
        <p><strong>Atık Miktarı:</strong> {formData.atikGeriDonusum?.atikMiktari || "N/A"}</p>
        <p><strong>Geri Dönüşüm Oranı:</strong> {formData.atikGeriDonusum?.geriDonusumOrani || "N/A"}%</p>
      </div>

      {/* Karbon Ayak İzi Hesaplama Kartı */}
      {/* <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <CarbonFootprintCalculator formData={formData} />
      </div> */}

      {/* Navigasyon */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition"
        >
          <ArrowLeft size={16} />
          Geri
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition"
        >
          <ArrowRight size={16} />
          Kaydet
        </button>
        
      </div>
    </div>
  );
};

export default Step6;
