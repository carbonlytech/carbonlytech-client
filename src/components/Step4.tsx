import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step4: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [surecTipi, setSurecTipi] = useState(formData.surecTipi || "");
  const [emisyonFaktoru, setEmisyonFaktoru] = useState(formData.emisyonFaktoru || "");
  const [co2, setCo2] = useState(formData.co2 || "");
  const [ch4, setCh4] = useState(formData.ch4 || "");
  const [n2o, setN2o] = useState(formData.n2o || "");

  const handleNext = () => {
    update({ surecTipi, emisyonFaktoru, co2, ch4, n2o });
    nextStep();
  };

  const handlePrev = () => {
    update({ surecTipi, emisyonFaktoru, co2, ch4, n2o });
    prevStep();
  };

  return (
    <div className="p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Emisyon ve Süreç Verileri</h2>

      {/* Üretim Süreci */}
      <div className="mb-4">
        <label className="block font-medium text-green-700 mb-1">Üretim Süreci Türü</label>
        <select
          className="input border-green-300 focus:ring-green-500"
          value={surecTipi}
          onChange={(e) => setSurecTipi(e.target.value)}
        >
          <option value="">Seçiniz</option>
          <option value="elektrik-ark-ocagi">Elektrik Ark Ocağı</option>
          <option value="yüksek-firin">Yüksek Fırın</option>
          <option value="klinker-üretimi">Klinker Üretimi</option>
          <option value="haber-bosch">Haber-Bosch Süreci</option>
          <option value="diger">Diğer</option>
        </select>
      </div>

      {/* Emisyon Faktörü */}
      <div className="mb-4">
        <label className="block font-medium text-green-700 mb-1">Emisyon Faktörü (opsiyonel)</label>
        <input
          type="number"
          placeholder="Örn: 1.7 (kg CO₂ / kg üretim)"
          value={emisyonFaktoru}
          onChange={(e) => setEmisyonFaktoru(e.target.value)}
          className="input border-green-300 focus:ring-green-500"
        />
      </div>

      {/* Ek Emisyonlar */}
      <div className="mb-6">
        <label className="block font-medium text-green-700 mb-1">Proses Bazlı Ek Emisyonlar (opsiyonel)</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            placeholder="CO₂ (kg)"
            value={co2}
            onChange={(e) => setCo2(e.target.value)}
            className="input border-green-300 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="CH₄ (kg)"
            value={ch4}
            onChange={(e) => setCh4(e.target.value)}
            className="input border-green-300 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="N₂O (kg)"
            value={n2o}
            onChange={(e) => setN2o(e.target.value)}
            className="input border-green-300 focus:ring-green-500"
          />
        </div>
        <small className="text-xs text-gray-500">Bu değerler varsa girilmelidir.</small>
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

export default Step4;
