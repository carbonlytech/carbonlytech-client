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
    <div>
      <h2 className="text-xl font-bold mb-4">Atık & Geri Dönüşüm Bilgileri</h2>

      {/* Atık Miktarı */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Atık Miktarı (kg/ton)</label>
        <input
          type="number"
          value={atikMiktari}
          onChange={(e) => setAtikMiktari(e.target.value)}
          placeholder="Atık miktarını girin"
          className="input"
        />
        <select
          value={formData.birim || "kg"}
          onChange={(e) => update({ birim: e.target.value })}
          className="input mt-2"
        >
          <option value="kg">kg</option>
          <option value="ton">ton</option>
        </select>
      </div>

      {/* Geri Dönüşüm Oranı */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Geri Dönüşüm Oranı (%)</label>
        <input
          type="number"
          value={geriDonusumOrani}
          onChange={(e) => setGeriDonusumOrani(e.target.value)}
          placeholder="Geri dönüşüm oranını girin"
          className="input"
        />
      </div>

      {/* Atık Tipi */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Atık Tipi (Opsiyonel)</label>
        <select
          value={atikTipi}
          onChange={(e) => setAtikTipi(e.target.value)}
          className="input"
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
        <button onClick={handlePrev} className="btn btn-secondary">
          Geri
        </button>
        <button onClick={handleNext} className="btn btn-primary">
          Devam Et
        </button>
      </div>
    </div>
  );
};

export default Step5;