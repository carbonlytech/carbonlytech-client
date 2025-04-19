import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Recycle } from "lucide-react";
import toast from "react-hot-toast";

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

  const validateStep=()=>{
    if(atikMiktari && !geriDonusumOrani){
      toast.error("Oranı belirtiniz");
      return false;
    }

    return true;
  }

  const handleNext = () => {
    if(!validateStep()){
      return;
    }

    update({ atikMiktari, geriDonusumOrani, atikTipi });
    nextStep();
  };

  const handlePrev = () => {
    update({ atikMiktari, geriDonusumOrani, atikTipi });
    prevStep();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <Recycle className="text-green-600" size={28} />
        <h2 className="text-3xl font-semibold text-green-700">Atık & Geri Dönüşüm</h2>
      </div>

      {/* Atık Miktarı */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Atık Miktarı</label>
        <div className="flex gap-3">
          <input
            type="number"
            value={atikMiktari}
            onChange={(e) => setAtikMiktari(e.target.value)}
            placeholder="Örn: 120"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <select
            value={formData.birim || "kg"}
            onChange={(e) => update({ birim: e.target.value })}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
          >
            <option value="kg">kg</option>
            <option value="ton">ton</option>
          </select>
        </div>
      </div>

      {/* Geri Dönüşüm Oranı */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Geri Dönüşüm Oranı (%)</label>
        <input
          type="number"
          value={geriDonusumOrani}
          onChange={(e) => setGeriDonusumOrani(e.target.value)}
          placeholder="Örn: 65"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Atık Tipi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Atık Tipi (Opsiyonel)</label>
        <select
          value={atikTipi}
          onChange={(e) => setAtikTipi(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Seçiniz</option>
          <option value="organik">Organik</option>
          <option value="plastik">Plastik</option>
          <option value="metal">Metal</option>
          <option value="diğer">Diğer</option>
        </select>
      </div>

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
          onClick={handleNext}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Devam Et
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Step5;
