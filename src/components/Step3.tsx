import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step3: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [yakitlar, setYakitlar] = useState(formData.yakitlar || [
    { tip: "", miktar: "", birim: "litre", donem: "yillik" },
  ]);
  const [hammaddeler, setHammaddeler] = useState(formData.hammaddeler || [
    { ad: "", miktar: "", birim: "ton", tedarik: "yerli" },
  ]);

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

  const handleNext = () => {
    update({ yakitlar, hammaddeler });
    nextStep();
  };

  const handlePrev = () => {
    update({ yakitlar, hammaddeler });
    prevStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Yakıt ve Hammadde Kullanımı</h2>

      {/* Yakıtlar */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Yakıtlar</h3>
        {yakitlar.map((yakit: any, index: number) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-center">
            <input
              placeholder="Yakıt Tipi"
              value={yakit.tip}
              onChange={(e) => handleYakitChange(index, "tip", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Miktar"
              value={yakit.miktar}
              onChange={(e) => handleYakitChange(index, "miktar", e.target.value)}
              className="input"
            />
            <select
              value={yakit.birim}
              onChange={(e) => handleYakitChange(index, "birim", e.target.value)}
              className="input"
            >
              <option value="litre">litre</option>
              <option value="kg">kg</option>
              <option value="m³">m³</option>
            </select>
            <select
              value={yakit.donem}
              onChange={(e) => handleYakitChange(index, "donem", e.target.value)}
              className="input"
            >
              <option value="yillik">Yıllık</option>
              <option value="aylik">Aylık</option>
              <option value="gunluk">Günlük</option>
            </select>
            <button
              onClick={() => removeYakit(index)}
              className="btn btn-xs btn-error"
              disabled={yakitlar.length === 1}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setYakitlar([...yakitlar, { tip: "", miktar: "", birim: "litre", donem: "yillik" }])
          }
          className="btn btn-sm btn-outline mt-2"
        >
          + Yakıt Ekle
        </button>
      </div>

      {/* Hammaddeler */}
      <div>
        <h3 className="font-semibold mb-2">Hammaddeler</h3>
        {hammaddeler.map((hammadde: any, index: number) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-center">
            <input
              placeholder="Malzeme Adı"
              value={hammadde.ad}
              onChange={(e) => handleHammaddeChange(index, "ad", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Miktar"
              value={hammadde.miktar}
              onChange={(e) => handleHammaddeChange(index, "miktar", e.target.value)}
              className="input"
            />
            <select
              value={hammadde.birim}
              onChange={(e) => handleHammaddeChange(index, "birim", e.target.value)}
              className="input"
            >
              <option value="ton">ton</option>
              <option value="kg">kg</option>
            </select>
            <select
              value={hammadde.tedarik}
              onChange={(e) => handleHammaddeChange(index, "tedarik", e.target.value)}
              className="input"
            >
              <option value="yerli">Yerli</option>
              <option value="ithal">İthal</option>
            </select>
            <button
              onClick={() => removeHammadde(index)}
              className="btn btn-xs btn-error"
              disabled={hammaddeler.length === 1}
            >
              Sil
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setHammaddeler([...hammaddeler, { ad: "", miktar: "", birim: "ton", tedarik: "yerli" }])
          }
          className="btn btn-sm btn-outline mt-2"
        >
          + Hammadde Ekle
        </button>
      </div>

      <div className="flex justify-between mt-6">
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

export default Step3;
