import React, { useState } from "react";
import { Fuel, Box, ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { Autocomplete, TextField } from "@mui/material";
import emisyonfaktorleriyakitdatasi from "../datasForEnergyThirdStep/emisyonfaktorleriyakitdatası";
import emisyonfaktorlerihammaddedatasi from "../datasForEnergyThirdStep/emisyonfaktorlerihammaddedatası";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step3: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [yakitlar, setYakitlar] = useState(
    formData.yakitlar || [
      { tip: "", miktar: "", birim: "litre", donem: "yillik",manuel: false,emisyonFaktor: "" },
    ]
  );
  const [hammaddeler, setHammaddeler] = useState(
    formData.hammaddeler || [
      { ad: "", miktar: "", birim: "ton", donem: "yillik", manuel: false, emisyonFaktor: "" },
    ]
  );

  const handleYakitChange = (index: number, field: string, value: any) => {
    const updated = [...yakitlar];
    updated[index][field] = value;
    setYakitlar(updated);
  };

  const handleHammaddeChange = (index: number, field: string, value: any) => {
    const updated = [...hammaddeler];
    updated[index][field] = value;
    setHammaddeler(updated);
  };

  const removeYakit = (index: number) => {
    if (yakitlar.length === 1) return;
    const updated = [...yakitlar];
    updated.splice(index, 1);
    setYakitlar(updated);
  };

  const removeHammadde = (index: number) => {
    if (hammaddeler.length === 1) return;
    const updated = [...hammaddeler];
    updated.splice(index, 1);
    setHammaddeler(updated);
  };

  const validateStep=()=>{
    for(const yakit of yakitlar){
      if(yakit.tip && !yakit.miktar){
        toast.error("Lütfen yakıt miktarını giriniz");
        return false;
      }
    }

    for(const hammadde of hammaddeler){
      if(hammadde.ad && !hammadde.miktar){
        toast.error("Lütfen hammadde miktarını giriniz");
        return false;
      }
    }

    return true;
  }

  const handleNext = () => {
    if(!validateStep()) return;
    
    
    update({ yakitlar, hammaddeler });
    nextStep();
  };

  const handlePrev = () => {
    update({ yakitlar, hammaddeler });
    prevStep();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <Fuel className="text-green-600" size={28} />
        <h2 className="text-3xl font-semibold text-green-700">Yakıt ve Hammadde Kullanımı</h2>
      </div>

      {/* Yakıtlar */}
      <div className="mb-8">
        <h3 className="font-semibold text-green-700 mb-2">Yakıtlar</h3>
        {yakitlar.map((yakit: any, index: number) => (
          <div key={index} className="grid grid-cols-5 gap-4 mb-4 items-center">

            <div className="col-span-2">
              <Autocomplete
                disablePortal
                options={emisyonfaktorleriyakitdatasi}
                renderInput={(params) => <TextField {...params} label="Yakıt Tipi" />}
                getOptionLabel={(option) => `${option.label}`}
                onChange={(event, newValue) => {
                  if (newValue) {
                    if (newValue.value === 'manuel') {
                      handleYakitChange(index, "manuel", true);
                      handleYakitChange(index, "tip", "Manuel Giriş");
                      handleYakitChange(index, "emisyonFaktor", ""); // Manuel olduğu için sıfırla
                    } else {
                      handleYakitChange(index, "manuel", false);
                      handleYakitChange(index, "tip", newValue.label);
                      handleYakitChange(index, "emisyonFaktor", String(newValue.value));
                    }
                  } else {
                    handleYakitChange(index, "manuel", false);
                    handleYakitChange(index, "tip", "");
                    handleYakitChange(index, "emisyonFaktor", "");
                  }
                }}
              />
            </div>

            {yakit.manuel && (
              <div className="col-span-2">
                <input
                  type="number"
                  step="0.001"
                  placeholder="Emisyon Faktörü (kg CO₂e/kWh)"
                  value={yakit.emisyonFaktor}
                  onChange={(e) => handleYakitChange(index, "emisyonFaktor", e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            )}

            <input
              type="number"
              placeholder="Miktar"
              value={yakit.miktar}
              onChange={(e) => handleYakitChange(index, "miktar", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <select
              value={yakit.birim}
              onChange={(e) => handleYakitChange(index, "birim", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="litre">litre</option>
              <option value="kg">kg</option>
              <option value="m³">m³</option>
            </select>
            <select
              value={yakit.donem}
              onChange={(e) => handleYakitChange(index, "donem", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="yillik">Yıllık</option>
              <option value="aylik">Aylık</option>
              <option value="gunluk">Günlük</option>
            </select>
            <button
              onClick={() => removeYakit(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              disabled={yakitlar.length === 1}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setYakitlar([
              ...yakitlar,
              { tip: "", miktar: "", birim: "litre", donem: "yillik" },
            ])
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          + Yakıt Ekle
        </button>
      </div>

      {/* Hammaddeler */}
      <div>
        <h3 className="font-semibold text-green-700 mb-2">Hammaddeler</h3>
        {hammaddeler.map((hammadde: any, index: number) => (
          <div key={index} className="grid grid-cols-6 gap-4 mb-4 items-center">

            <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  options={emisyonfaktorlerihammaddedatasi}
                  renderInput={(params) => <TextField {...params} label="Yakıt Tipi" />}
                  getOptionLabel={(option) => `${option.label}`}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      if (newValue.value === 'manuel') {
                        handleHammaddeChange(index, "manuel", true);
                        handleHammaddeChange(index, "ad", "Manuel Giriş");
                        handleHammaddeChange(index, "emisyonFaktor", ""); // Manuel olduğu için sıfırla
                      } else {
                        handleHammaddeChange(index, "manuel", false);
                        handleHammaddeChange(index, "ad", newValue.label);
                        handleHammaddeChange(index, "emisyonFaktor", String(newValue.value));
                      }
                    } else {
                      handleHammaddeChange(index, "manuel", false);
                      handleHammaddeChange(index, "ad", "");
                      handleHammaddeChange(index, "emisyonFaktor", "");
                    }
                  }}
                />
            </div>

            {hammadde.manuel && (
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.001"
                    placeholder="Emisyon Faktörü (kg CO₂e/kWh)"
                    value={hammadde.emisyonFaktor}
                    onChange={(e) => handleHammaddeChange(index, "emisyonFaktor", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>
            )}

            <input
              type="number"
              placeholder="Miktar"
              value={hammadde.miktar}
              onChange={(e) => handleHammaddeChange(index, "miktar", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <select
              value={hammadde.birim}
              onChange={(e) => handleHammaddeChange(index, "birim", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="ton">ton</option>
              <option value="kg">kg</option>
              <option value="litre">litre</option>
            </select>

            <select
              value={hammadde.donem}
              onChange={(e) => handleHammaddeChange(index, "donem", e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="yillik">Yıllık</option>
              <option value="aylik">Aylık</option>
              <option value="gunluk">Günlük</option>
            </select>

            <button
              onClick={() => removeHammadde(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              disabled={hammaddeler.length === 1}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setHammaddeler([
              ...hammaddeler,
              { ad: "", miktar: "", birim: "ton", tedarik: "yerli" },
            ])
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          + Hammadde Ekle
        </button>
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
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

export default Step3;
