import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step5: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [atikMiktari, setAtikMiktari] = useState(formData.atikMiktari || "");
  const [geriDonusumOrani, setGeriDonusumOrani] = useState(formData.geriDonusumOrani || "");
  const [atikTipi, setAtikTipi] = useState(formData.atikTipi || "");

  const handleNext = () => {
    update({ atikMiktari, geriDonusumOrani, atikTipi });
    nextStep();
  };

  const handlePrev = () => {
    update({ atikMiktari, geriDonusumOrani, atikTipi });
    prevStep();
  };

  return (
    <div className="p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Atık & Geri Dönüşüm Bilgileri</h2>

      {/* Atık Miktarı */}
      <div className="mb-4">
        <label className="block font-medium text-green-700 mb-1">Atık Miktarı (kg/ton)</label>
        <input
          type="number"
          value={atikMiktari}
          onChange={(e) => setAtikMiktari(e.target.value)}
          placeholder="Atık miktarını girin"
          className="input border-green-300 focus:ring-green-500"
        />
        <select
          value={formData.birim || "kg"}
          onChange={(e) => update({ birim: e.target.value })}
          className="input mt-2 border-green-300 focus:ring-green-500"
        >
          <option value="kg">kg</option>
          <option value="ton">ton</option>
        </select>
      </div>

      {/* Geri Dönüşüm Oranı */}
      <div className="mb-4">
        <label className="block font-medium text-green-700 mb-1">Geri Dönüşüm Oranı (%)</label>
        <input
          type="number"
          value={geriDonusumOrani}
          onChange={(e) => setGeriDonusumOrani(e.target.value)}
          placeholder="Geri dönüşüm oranını girin"
          className="input border-green-300 focus:ring-green-500"
        />
      </div>

      {/* Atık Tipi */}
      <div className="mb-4">
        <label className="block font-medium text-green-700 mb-1">Atık Tipi (Opsiyonel)</label>
        <select
          value={atikTipi}
          onChange={(e) => setAtikTipi(e.target.value)}
          className="input border-green-300 focus:ring-green-500"
        >
          <option value="">Seçiniz</option>
          <option value="organik">Organik</option>
          <option value="plastik">Plastik</option>
          <option value="metal">Metal</option>
          <option value="diğer">Diğer</option>
        </select>
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Geri
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
};

export default Step5;
