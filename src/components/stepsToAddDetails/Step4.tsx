import React, { useState } from "react";
import { Factory, ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step4: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [co2, setCo2] = useState(formData.co2 || "");
  const [ch4, setCh4] = useState(formData.ch4 || "");
  const [n2o, setN2o] = useState(formData.n2o || "");

  const handleNext = () => {
    update({ co2, ch4, n2o });
    nextStep();
  };

  const handlePrev = () => {
    update({ co2, ch4, n2o });
    prevStep();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <Factory className="text-green-600" size={28} />
        <h2 className="text-3xl font-semibold text-green-700">Emisyon ve Süreç Verileri</h2>
      </div>

      {/* Ek Emisyonlar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Proses Bazlı Ek Emisyonlar (opsiyonel)
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="CO₂ (kg)"
            value={co2}
            onChange={(e) => setCo2(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="CH₄ (kg)"
            value={ch4}
            onChange={(e) => setCh4(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="N₂O (kg)"
            value={n2o}
            onChange={(e) => setN2o(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Eğer bu değerler varsa, hesaplamalara dahil edilmelidir.
        </p>
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between pt-4">
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

export default Step4;
