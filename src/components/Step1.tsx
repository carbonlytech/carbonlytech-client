import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
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
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Firma ve Üretim Bilgileri</h2>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Tesis Lokasyonu (Ülke, Şehir)"
          value={lokasyon}
          onChange={(e) => setLokasyon(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Sektör Alt Dalı"
          value={sektor}
          onChange={(e) => setSektor(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={cbam}
            onChange={() => setCbam(!cbam)}
            className="accent-green-600"
          />
          CBAM kapsamında mısınız?
        </label>

        <input
          type="text"
          placeholder="Ürün Adı"
          value={urun}
          onChange={(e) => setUrun(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Üretim Miktarı"
            value={miktar}
            onChange={(e) => setMiktar(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={birim}
            onChange={(e) => setBirim(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="ton">ton</option>
            <option value="kg">kg</option>
            <option value="adet">adet</option>
          </select>
        </div>

        <select
          value={uretimDonem}
          onChange={(e) => setUretimDonem(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="yillik">Yıllık</option>
          <option value="aylik">Aylık</option>
          <option value="gunluk">Günlük</option>
        </select>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
