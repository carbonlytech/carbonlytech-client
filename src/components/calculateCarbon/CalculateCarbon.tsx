const CalculateCarbon = (formData: any) => {
    let toplam = 0;
  
    // 1. Süreç Emisyonları (CO2e)
    const co2 = parseFloat(formData.emisyon?.co2 || "0");
    const ch4 = parseFloat(formData.emisyon?.ch4 || "0");
    const n2o = parseFloat(formData.emisyon?.n2o || "0");
    toplam += co2 + ch4 * 25 + n2o * 298;
  
    // 2. Yakıt Emisyonları (örnek faktör: kg CO2e / litre)
    const yakitlar = formData.yakitHammadde?.yakitlar || [];
    const yakitFaktorleri: Record<string, number> = {
      "motorin": 2.68,
      "benzin": 2.31,
      "fuel-oil": 3.14,
      "lpg": 1.51
    };
    yakitlar.forEach((yakit: any) => {
      const miktar = parseFloat(yakit.miktar || "0");
      const faktor = yakitFaktorleri[yakit.tip?.toLowerCase()] || 0;
      toplam += miktar * faktor;
    });
  
    // 3. Elektrik Emisyonu (örnek: 0.4 kg CO2e / kWh)
    const elektrikMiktar = parseFloat(formData.enerji?.elektrikMiktar || "0");
    const elektrikKaynak = formData.enerji?.elektrikKaynak?.toLowerCase();
    const elektrikFaktor = elektrikKaynak === "yenilenebilir" ? 0.05 : 0.4;
    toplam += elektrikMiktar * elektrikFaktor;
  
    // 4. Hammadde Emisyonları (örnek faktör: kg CO2e / kg hammadde)
    const hammaddeler = formData.yakitHammadde?.hammaddeler || [];
    const hammaddeFaktorleri: Record<string, number> = {
      "çelik": 2.1,
      "alüminyum": 9.0,
      "plastik": 2.5,
    };
    hammaddeler.forEach((madde: any) => {
      const miktar = parseFloat(madde.miktar || "0");
      const faktor = hammaddeFaktorleri[madde.ad?.toLowerCase()] || 0;
      toplam += miktar * faktor;
    });
  
    // 5. Geri Dönüşüm Azaltımı (örnek: % oranında azaltım)
    const atikMiktari = parseFloat(formData.atikGeriDonusum?.atikMiktari || "0");
    const geriOran = parseFloat(formData.atikGeriDonusum?.geriDonusumOrani || "0") / 100;
    const atikEmisyonFaktoru = 1.2; // kg CO2e / kg atık
    const geriKazanim = atikMiktari * geriOran * atikEmisyonFaktoru;
    toplam -= geriKazanim;
  
    return Number(toplam.toFixed(2)); // kg CO2e
  };

  export default CalculateCarbon