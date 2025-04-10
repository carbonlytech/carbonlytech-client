// components/CarbonFootprintCalculator.tsx
import React, { useEffect, useState } from "react";

interface CarbonFootprintProps {
  formData: any;
}

const CarbonFootprintCalculator: React.FC<CarbonFootprintProps> = ({ formData }) => {
  const [karbonAyakIzi, setKarbonAyakIzi] = useState<number | null>(null);

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
    <div className="mb-6">
      <h3 className="font-medium mb-2">Toplam Karbon Ayak İzi</h3>
      <p>
        <strong>Hesaplanan Karbon Ayak İzi (kg CO₂):</strong>{" "}
        {karbonAyakIzi !== null ? karbonAyakIzi.toFixed(2) : "Hesaplanmadı"}
      </p>
    </div>
  );
};

export default CarbonFootprintCalculator;
