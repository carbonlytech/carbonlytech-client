import React, { useEffect, useState } from "react";

interface Props {
  prevStep: () => void;
  formData: any;
}

const Step6: React.FC<Props> = ({ prevStep, formData }) => {
  const [karbonAyakIzi, setKarbonAyakIzi] = useState<number | null>(null);
  console.log("Step6 daki form özeti", formData);

  useEffect(() => {
    const elektrikKg = Number(formData.enerji?.elektrikMiktar || 0) * 0.4; // kWh başına kg CO2
    const dogalgazKg = Number(formData.enerji?.dogalgazMiktar || 0) * 2.0; // m³ başına kg CO2

    const yakitKg = (formData.yakitHammadde?.yakitlar || []).reduce(
      (toplam: number, yakit: any) =>
        toplam + Number(yakit.miktar || 0) * 2.5, // örnek katsayı
      0
    );

    const emisyonKg =
      Number(formData.emisyon?.co2 || 0) +
      Number(formData.emisyon?.ch4 || 0) * 25 + // CH4 GWP
      Number(formData.emisyon?.n2o || 0) * 298; // N2O GWP

    const toplamKarbon = elektrikKg + dogalgazKg + yakitKg + emisyonKg;

    setKarbonAyakIzi(toplamKarbon);
  }, [formData]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Özet ve Hesaplama</h2>

      {/* Firma Bilgileri */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Firma Bilgileri</h3>
        <p><strong>Firma Adı:</strong> {formData.firma?.ad || "N/A"}</p>
        <p><strong>Lokasyon:</strong> {formData.firma?.lokasyon || "N/A"}</p>
        <p><strong>Sektör:</strong> {formData.firma?.sektor || "N/A"}</p>
      </div>

      {/* Üretim Bilgileri */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Üretim Bilgileri</h3>
        <p><strong>Üretilen Ürün:</strong> {formData.firma?.urun || "N/A"}</p>
        <p><strong>Üretim Miktarı:</strong> {formData.firma?.miktar || "N/A"}</p>
      </div>

      {/* Enerji Tüketimi */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Enerji Tüketimi</h3>
        <p><strong>Elektrik:</strong> {formData.enerji?.elektrikMiktar} {formData.enerji?.elektrikBirim} ({formData.enerji?.elektrikDonem})</p>
        <p><strong>Doğalgaz:</strong> {formData.enerji?.dogalgazMiktar} {formData.enerji?.dogalgazBirim} ({formData.enerji?.dogalgazDonem})</p>
        <p><strong>Kömür:</strong> {formData.enerji?.komurMiktar || "N/A"} {formData.enerji?.komurBirim || ""}</p>
        <p><strong>Elektrik Kaynağı:</strong> {formData.enerji?.elektrikKaynak || "N/A"}</p>
      </div>

      {/* Yakıt Kullanımı */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Yakıt Kullanımı</h3>
        {(formData.yakitHammadde?.yakitlar || []).map((yakit: any, i: number) => (
          <p key={i}>
            {yakit.tip}: {yakit.miktar} {yakit.birim} ({yakit.donem})
          </p>
        ))}
      </div>

      {/* Hammadde Kullanımı */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Hammadde Kullanımı</h3>
        {(formData.yakitHammadde?.hammaddeler || []).map((madde: any, i: number) => (
          <p key={i}>
            {madde.ad}: {madde.miktar} {madde.birim} ({madde.tedarik})
          </p>
        ))}
      </div>

      {/* Emisyon Verileri */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Emisyon Verileri</h3>
        <p><strong>Süreç Tipi:</strong> {formData.emisyon?.surecTipi || "N/A"}</p>
        <p><strong>Emisyon Faktörü:</strong> {formData.emisyon?.emisyonFaktoru || "N/A"}</p>
        <p><strong>CO₂:</strong> {formData.emisyon?.co2} kg</p>
        <p><strong>CH₄:</strong> {formData.emisyon?.ch4} kg</p>
        <p><strong>N₂O:</strong> {formData.emisyon?.n2o} kg</p>
      </div>

      {/* Atık ve Geri Dönüşüm */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Atık & Geri Dönüşüm</h3>
        <p><strong>Atık Tipi:</strong> {formData.atikGeriDonusum?.atikTipi || "N/A"}</p>
        <p><strong>Atık Miktarı:</strong> {formData.atikGeriDonusum?.atikMiktari || "N/A"}</p>
        <p><strong>Geri Dönüşüm Oranı:</strong> {formData.atikGeriDonusum?.geriDonusumOrani || "N/A"}%</p>
      </div>

      {/* Karbon Ayak İzi */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Toplam Karbon Ayak İzi</h3>
        <p>
          <strong>Hesaplanan Karbon Ayak İzi (kg CO₂):</strong>{" "}
          {karbonAyakIzi !== null ? karbonAyakIzi.toFixed(2) : "Hesaplanmadı"}
        </p>
      </div>

      {/* Navigasyon */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn btn-secondary">
          Geri
        </button>
        <button className="btn btn-primary">Hesapla</button>
      </div>
    </div>
  );
};

export default Step6;
