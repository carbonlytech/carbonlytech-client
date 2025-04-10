import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step1: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
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
    <div>
      <h2 className="text-xl font-bold mb-4">Firma ve Üretim Bilgileri</h2>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Tesis Lokasyonu (Ülke, Şehir)"
          value={lokasyon}
          onChange={(e) => setLokasyon(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Sektör Alt Dalı"
          value={sektor}
          onChange={(e) => setSektor(e.target.value)}
          className="input"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cbam}
            onChange={() => setCbam(!cbam)}
          />
          CBAM kapsamında mısınız?
        </label>
        <input
          type="text"
          placeholder="Ürün Adı"
          value={urun}
          onChange={(e) => setUrun(e.target.value)}
          className="input"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Üretim Miktarı"
            value={miktar}
            onChange={(e) => setMiktar(e.target.value)}
            className="input"
          />
          <select
            value={birim}
            onChange={(e) => setBirim(e.target.value)}
            className="input"
          >
            <option value="ton">ton</option>
            <option value="kg">kg</option>
            <option value="adet">adet</option>
          </select>

          <select
            value={uretimDonem}
            onChange={(e) => setUretimDonem(e.target.value)}
            className="input"
          >
            <option value="yillik">Yıllık</option>
            <option value="aylik">Aylık</option>
            <option value="gunluk">Günlük</option>
          </select>
        </div>

        <div>
          <button onClick={handleNext} className="btn btn-primary mt-4">
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
