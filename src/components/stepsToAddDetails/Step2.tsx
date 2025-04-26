import React, { useState } from "react";
import { BatteryCharging, ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import emisyonfaktorlerielektrik from "../productswithcbamcodes/emisyonfaktorlerielektrikdatası";
import { Autocomplete, TextField } from "@mui/material";
import emisyonfaktorlerielektrikdatası from "../productswithcbamcodes/emisyonfaktorlerielektrikdatası";
import emisyonfaktorleridogalgazdatasi from "../productswithcbamcodes/emisyonfaktorleridogalgazdatası";
import emisyonfaktorlerikomurdatasi from "../productswithcbamcodes/emisyonfaktorlerikomurdatası";

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

  const [elektrikDonem, setElektrikDonem] = useState(formData.elektrikDonem || "yillik");
  const [dogalgazDonem, setDogalgazDonem] = useState(formData.dogalgazDonem || "yillik");
  const [komurDonem, setKomurDonem] = useState(formData.komurDonem || "yillik");

  const [emisyonFaktorElektrik, setEmisyonFaktorElektrik] = useState(formData.emisyonFaktorElektrik || "");
  const [manuelEmisyonElektrik, setManuelEmisyonElektrik] = useState(false);
  const [emisyonFaktorDogalgaz, setEmisyonFaktorDogalgaz] = useState(formData.emisyonFaktorDogalgaz || "");
  const [manuelEmisyonDogalgaz, setManuelEmisyonDogalgaz] = useState(false);
  const [emisyonFaktorKomur, setEmisyonFaktorKomur] = useState(formData.emisyonFaktorKomur || "");
  const [manuelEmisyonKomur, setManuelEmisyonKomur] = useState(false);


  const validateStep=()=>{
    if(elektrikKullaniliyor && !elektrikMiktar){
      return false;
    }  
    if(dogalgazKullaniliyor && !dogalgazMiktar){
      return false;
    }  
    if(komurKullaniliyor && !komurMiktar){
      return false;
    }    

    return true;
  }

  const handleNext = () => {
    if(!validateStep()){
      toast.error("Lütfen miktarı belirtiniz.");
      return;
    }

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
      elektrikDonem,
      dogalgazDonem,
      komurDonem,
      emisyonFaktorElektrik,
      emisyonFaktorDogalgaz,
      emisyonFaktorKomur
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
      elektrikDonem,
      dogalgazDonem,
      komurDonem,
      emisyonFaktorElektrik,
      emisyonFaktorDogalgaz,
      emisyonFaktorKomur
    });
    prevStep();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto space-y-8">
      <h2 className="flex items-center space-x-3 text-3xl font-semibold text-green-700">
        <BatteryCharging className="text-green-600" size={28} />
        <span>Enerji Tüketimi</span>
      </h2>

      {/* Elektrik */}
      <div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={elektrikKullaniliyor}
            onChange={() => setElektrikKullaniliyor(!elektrikKullaniliyor)}
            className="accent-green-600"
          />
          <label className="text-sm font-medium text-gray-700">Elektrik kullanılıyor</label>
        </div>

        {elektrikKullaniliyor && (
          <div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Tüketim Miktarı"
                  value={elektrikMiktar}
                  onChange={(e) => setElektrikMiktar(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={elektrikBirim}
                  onChange={(e) => setElektrikBirim(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="kWh">kWh</option>
                  <option value="MWh">MWh</option>
                </select>
              </div>
              
              <select
                value={elektrikDonem}
                onChange={(e) => setElektrikDonem(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              >
                <option value="yillik">Yıllık</option>
                <option value="aylik">Aylık</option>
                <option value="gunluk">Günlük</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emisyon Faktörü Seçimi</label>
              <Autocomplete
                disablePortal
                options={emisyonfaktorlerielektrikdatası}
                renderInput={(params) => <TextField {...params} label="Emisyon Faktörü" />}
                getOptionLabel={(option) => `${option.label}`}
                onChange={(event, newValue) => {
                  if (newValue) {
                    if (newValue.value === 'manuel') {
                      setManuelEmisyonElektrik(true);
                      setEmisyonFaktorElektrik('');
                    } else {
                      setManuelEmisyonElektrik(false);
                      setEmisyonFaktorElektrik(String(newValue.value));
                    }
                  } else {
                    setManuelEmisyonElektrik(false);
                    setEmisyonFaktorElektrik('');
                  }
                }}
              />

              {manuelEmisyonElektrik && (
                <input
                  type="number"
                  step="0.001"
                  placeholder="Emisyon Faktörü (kg CO₂e/kWh)"
                  value={emisyonFaktorElektrik}
                  onChange={(e) => setEmisyonFaktorElektrik(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 mt-2"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Doğalgaz */}
      <div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={dogalgazKullaniliyor}
            onChange={() => setDogalgazKullaniliyor(!dogalgazKullaniliyor)}
            className="accent-green-600"
          />
          <label className="text-sm font-medium text-gray-700">Doğalgaz kullanılıyor</label>
        </div>

        {dogalgazKullaniliyor && (

          <div>
            <div className="space-y-4 mt-4">
              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Tüketim Miktarı"
                    value={dogalgazMiktar}
                    onChange={(e) => setDogalgazMiktar(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={dogalgazBirim}
                    onChange={(e) => setDogalgazBirim(e.target.value)}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="m³">m³</option>
                    <option value="kWh">kWh</option>
                  </select>
                </div>
                <select
                  value={dogalgazDonem}
                  onChange={(e) => setDogalgazDonem(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="yillik">Yıllık</option>
                  <option value="aylik">Aylık</option>
                  <option value="gunluk">Günlük</option>
                </select>


                

              </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Emisyon Faktörü Seçimi</label>
                <Autocomplete
                  disablePortal
                  options={emisyonfaktorleridogalgazdatasi}
                  renderInput={(params) => <TextField {...params} label="Emisyon Faktörü" />}
                  getOptionLabel={(option) => `${option.label}`}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      if (newValue.value === 'manuel') {
                        setManuelEmisyonDogalgaz(true);
                        setEmisyonFaktorDogalgaz('');
                      } else {
                        setManuelEmisyonDogalgaz(false);
                        setEmisyonFaktorDogalgaz(String(newValue.value));
                      }
                    } else {
                      setManuelEmisyonDogalgaz(false);
                      setEmisyonFaktorDogalgaz('');
                    }
                  }}
                />

                {manuelEmisyonDogalgaz && (
                  <input
                    type="number"
                    step="0.001"
                    placeholder="Emisyon Faktörü (kg CO₂e/kWh)"
                    value={emisyonFaktorDogalgaz}
                    onChange={(e) => setEmisyonFaktorDogalgaz(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 mt-2"
                  />
                )}
            </div>
          </div>
        )}
      </div>

      {/* Kömür */}
      <div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={komurKullaniliyor}
            onChange={() => setKomurKullaniliyor(!komurKullaniliyor)}
            className="accent-green-600"
          />
          <label className="text-sm font-medium text-gray-700">Kömür kullanılıyor</label>
        </div>

        {komurKullaniliyor && (
          <div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Tüketim Miktarı"
                  value={komurMiktar}
                  onChange={(e) => setKomurMiktar(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={komurBirim}
                  onChange={(e) => setKomurBirim(e.target.value)}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="ton">ton</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              <select
                value={komurDonem}
                onChange={(e) => setKomurDonem(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"
              >
                <option value="yillik">Yıllık</option>
                <option value="aylik">Aylık</option>
                <option value="gunluk">Günlük</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Emisyon Faktörü Seçimi</label>
              <Autocomplete
                disablePortal
                options={emisyonfaktorlerikomurdatasi}
                renderInput={(params) => <TextField {...params} label="Emisyon Faktörü" />}
                getOptionLabel={(option) => `${option.label}`}
                onChange={(event, newValue) => {
                  if (newValue) {
                    if (newValue.value === 'manuel') {
                      setManuelEmisyonKomur(true);
                      setEmisyonFaktorKomur('');
                    } else {
                      setManuelEmisyonKomur(false);
                      setEmisyonFaktorKomur(String(newValue.value));
                    }
                  } else {
                    setManuelEmisyonKomur(false);
                    setEmisyonFaktorKomur('');
                  }
                }}
              />

              {manuelEmisyonKomur && (
                <input
                  type="number"
                  step="0.001"
                  placeholder="Emisyon Faktörü (kg CO₂e/kWh)"
                  value={emisyonFaktorKomur}
                  onChange={(e) => setEmisyonFaktorKomur(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 mt-2"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between pt-6">
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

export default Step2;
