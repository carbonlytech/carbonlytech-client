import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep?: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step1: React.FC<Props> = ({ nextStep, formData, update }) => {
  const [lokasyon, setLokasyon] = useState(formData.lokasyon || "");
  const [sektor, setSektor] = useState(formData.sektor || "");
  const [cbam, setCbam] = useState(formData.cbam || false);
  const [urun, setUrun] = useState(formData.urun || "");
  const [miktar, setMiktar] = useState(formData.miktar || "");
  const [birim, setBirim] = useState(formData.birim || "ton");
  const [uretimDonem, setUretimDonem] = useState(formData.uretimDonem || "yillik");

  const handleNext = () => {
    update({ lokasyon, sektor, cbam, urun, miktar, birim, uretimDonem });
    nextStep();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <h2 className="text-2xl font-bold text-green-700">Firma ve Üretim Bilgileri</h2>

      {/* Firma Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tesis Lokasyonu</label>
          <input
            type="text"
            placeholder="Ülke, Şehir"
            value={lokasyon}
            onChange={(e) => setLokasyon(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sektör Alt Dalı</label>
          <input
            type="text"
            placeholder="Örn: Demir-Çelik, Kimya"
            value={sektor}
            onChange={(e) => setSektor(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* CBAM */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={cbam}
          onChange={() => setCbam(!cbam)}
          className="accent-green-600 h-5 w-5"
        />
        <label className="text-sm text-gray-700">CBAM (Sınırda Karbon Düzenleme Mekanizması) kapsamında mısınız?</label>
      </div>

      {/* Üretim Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
          <input
            type="text"
            placeholder="Üretilen ürünün adı"
            value={urun}
            onChange={(e) => setUrun(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Üretim Miktarı</label>
            <input
              type="number"
              placeholder="Örn: 1000"
              value={miktar}
              onChange={(e) => setMiktar(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birim</label>
            <select
              value={birim}
              onChange={(e) => setBirim(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="ton">Ton</option>
              <option value="kg">Kilogram</option>
              <option value="adet">Adet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Üretim Dönemi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Üretim Dönemi</label>
        <select
          value={uretimDonem}
          onChange={(e) => setUretimDonem(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="yillik">Yıllık</option>
          <option value="aylik">Aylık</option>
          <option value="gunluk">Günlük</option>
        </select>
      </div>

      {/* Buton */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
};

export default Step1;
