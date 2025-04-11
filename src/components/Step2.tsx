import React, { useState } from "react";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  update: (data: any) => void;
}

const Step2: React.FC<Props> = ({ nextStep, prevStep, formData, update }) => {
  const [elektrikKullaniliyor, setElektrikKullaniliyor] = useState(formData.elektrikKullaniliyor || false);
  const [dogalgazKullaniliyor, setDogalgazKullaniliyor] = useState(formData.dogalgazKullaniliyor || false);
  const [komurKullaniliyor, setKomurKullaniliyor] = useState(formData.komurKullaniliyor || false);

  const [elektrikMiktar, setElektrikMiktar] = useState(formData.elektrikMiktar || "");
  const [dogalgazMiktar, setDogalgazMiktar] = useState(formData.dogalgazMiktar || "");
  const [komurMiktar, setKomurMiktar] = useState(formData.komurMiktar || "");

  const [elektrikBirim, setElektrikBirim] = useState(formData.elektrikBirim || "kWh");
  const [dogalgazBirim, setDogalgazBirim] = useState(formData.dogalgazBirim || "m³");
  const [komurBirim, setKomurBirim] = useState(formData.komurBirim || "ton");

  const [elektrikKaynak, setElektrikKaynak] = useState(formData.elektrikKaynak || "sebekeden");

  const [elektrikDonem, setElektrikDonem] = useState(formData.elektrikDonem || "yillik");
  const [dogalgazDonem, setDogalgazDonem] = useState(formData.dogalgazDonem || "yillik");
  const [komurDonem, setKomurDonem] = useState(formData.komurDonem || "yillik");

  const handleNext = () => {
    update({
      elektrikKullaniliyor,
      dogalgazKullaniliyor,
      komurKullaniliyor,
      elektrikMiktar,
      dogalgazMiktar,
      komurMiktar,
      elektrikBirim,
      dogalgazBirim,
      komurBirim,
      elektrikKaynak,
      elektrikDonem,
      dogalgazDonem,
      komurDonem,
    });
    nextStep();
  };

  const handlePrev = () => {
    update({
      elektrikKullaniliyor,
      dogalgazKullaniliyor,
      komurKullaniliyor,
      elektrikMiktar,
      dogalgazMiktar,
      komurMiktar,
      elektrikBirim,
      dogalgazBirim,
      komurBirim,
      elektrikKaynak,
      elektrikDonem,
      dogalgazDonem,
      komurDonem,
    });
    prevStep();
  };

  return (
    <div className="bg-green-50 p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Enerji Tüketimi</h2>

      <div className="grid gap-6">
        {/* Elektrik */}
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <label className="flex items-center gap-2 mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={elektrikKullaniliyor}
              onChange={() => setElektrikKullaniliyor(!elektrikKullaniliyor)}
              className="accent-green-600"
            />
            Elektrik kullanılıyor
          </label>

          {elektrikKullaniliyor && (
            <div className="grid gap-4">
              <input
                type="number"
                placeholder="Tüketim Miktarı"
                value={elektrikMiktar}
                onChange={(e) => setElektrikMiktar(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={elektrikBirim}
                onChange={(e) => setElektrikBirim(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="kWh">kWh</option>
                <option value="MWh">MWh</option>
              </select>
              <select
                value={elektrikKaynak}
                onChange={(e) => setElektrikKaynak(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="sebekeden">Şebekeden</option>
                <option value="gunes">Güneş Enerjisi</option>
                <option value="ruzgar">Rüzgar Enerjisi</option>
                <option value="jenerator">Jeneratör</option>
              </select>
              <select
                value={elektrikDonem}
                onChange={(e) => setElektrikDonem(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="yillik">Yıllık</option>
                <option value="aylik">Aylık</option>
                <option value="gunluk">Günlük</option>
              </select>
            </div>
          )}
        </div>

        {/* Doğalgaz */}
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <label className="flex items-center gap-2 mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={dogalgazKullaniliyor}
              onChange={() => setDogalgazKullaniliyor(!dogalgazKullaniliyor)}
              className="accent-green-600"
            />
            Doğalgaz kullanılıyor
          </label>

          {dogalgazKullaniliyor && (
            <div className="grid gap-4">
              <input
                type="number"
                placeholder="Tüketim Miktarı"
                value={dogalgazMiktar}
                onChange={(e) => setDogalgazMiktar(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={dogalgazBirim}
                onChange={(e) => setDogalgazBirim(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="m³">m³</option>
                <option value="kWh">kWh</option>
              </select>
              <select
                value={dogalgazDonem}
                onChange={(e) => setDogalgazDonem(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="yillik">Yıllık</option>
                <option value="aylik">Aylık</option>
                <option value="gunluk">Günlük</option>
              </select>
            </div>
          )}
        </div>

        {/* Kömür */}
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <label className="flex items-center gap-2 mb-2 text-gray-700">
            <input
              type="checkbox"
              checked={komurKullaniliyor}
              onChange={() => setKomurKullaniliyor(!komurKullaniliyor)}
              className="accent-green-600"
            />
            Kömür kullanılıyor
          </label>

          {komurKullaniliyor && (
            <div className="grid gap-4">
              <input
                type="number"
                placeholder="Tüketim Miktarı"
                value={komurMiktar}
                onChange={(e) => setKomurMiktar(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={komurBirim}
                onChange={(e) => setKomurBirim(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ton">ton</option>
                <option value="kg">kg</option>
              </select>
              <select
                value={komurDonem}
                onChange={(e) => setKomurDonem(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="yillik">Yıllık</option>
                <option value="aylik">Aylık</option>
                <option value="gunluk">Günlük</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handlePrev} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition">
            Geri
          </button>
          <button onClick={handleNext} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition">
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
