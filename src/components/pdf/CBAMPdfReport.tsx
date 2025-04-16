import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Modern PDF stilleri
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#f5f5f5"
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "#2980b9",
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
    color: "#34495e"
  },
  boldText: {
    fontWeight: 'bold',
  },
  highlightText: {
    color: "#e74c3c",  // Önemli verileri vurgulamak için kırmızı renk
  }
});

// PDF Bileşeni
const CBAMPdfReport = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>CBAM Uyumlu Karbon Ayak İzi Raporu</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Firma Bilgileri</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Lokasyon:</Text> {data.firma.lokasyon}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Sektör:</Text> {data.firma.sektor}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Ürün:</Text> {data.firma.urun}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Üretim Miktarı:</Text> {data.firma.miktar} {data.firma.birim}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Üretim Dönemi:</Text> {data.firma.uretimDonem}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>CBAM Kapsamında mı?:</Text> {data.firma.cbam ? "Evet" : "Hayır"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Enerji Tüketimi</Text>
        {data.enerji.elektrikKullaniliyor && (
          <>
            <Text style={styles.text}><Text style={styles.boldText}>Elektrik:</Text> {data.enerji.elektrikMiktar} {data.enerji.elektrikBirim}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Kaynak:</Text> {data.enerji.elektrikKaynak}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Dönem:</Text> {data.enerji.elektrikDonem}</Text>
          </>
        )}
        {data.enerji.dogalgazKullaniliyor && (
          <>
            <Text style={styles.text}><Text style={styles.boldText}>Dogalgaz:</Text> {data.enerji.dogalgazMiktar} {data.enerji.dogalgazBirim}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Dönem:</Text> {data.enerji.dogalgazDonem}</Text>
          </>
        )}
        {data.enerji.komurKullaniliyor && (
          <>
            <Text style={styles.text}><Text style={styles.boldText}>Kömür:</Text> {data.enerji.komurMiktar} {data.enerji.komurBirim}</Text>
            <Text style={styles.text}><Text style={styles.boldText}>Dönem:</Text> {data.enerji.komurDonem}</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Yakıt Kullanımı</Text>
        {data.yakitHammadde.yakitlar.map((item: any, i: number) => (
          <Text key={i} style={styles.text}><Text style={styles.boldText}>{item.tip}:</Text> {item.miktar} {item.birim} ({item.donem})</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Hammadde Tüketimi</Text>
        {data.yakitHammadde.hammaddeler.map((item: any, i: number) => (
          <Text key={i} style={styles.text}><Text style={styles.boldText}>{item.ad}:</Text> {item.miktar} {item.birim} ({item.donem}) - <Text style={styles.highlightText}>Tedarik: {item.tedarik}</Text></Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Emisyon Verileri</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Süreç Tipi:</Text> {data.emisyon.surecTipi}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Emisyon Faktörü:</Text> {data.emisyon.emisyonFaktoru} kgCO₂e</Text>
        <Text style={styles.text}><Text style={styles.boldText}>CO₂ Emisyonu:</Text> {data.emisyon.co2} kg</Text>
        <Text style={styles.text}><Text style={styles.boldText}>CH₄ Emisyonu:</Text> {data.emisyon.ch4} kg</Text>
        <Text style={styles.text}><Text style={styles.boldText}>N₂O Emisyonu:</Text> {data.emisyon.n2o} kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Atık ve Geri Dönüşüm</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Atık Tipi:</Text> {data.atikGeriDonusum.atikTipi}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Toplam Atık:</Text> {data.atikGeriDonusum.atikMiktari} ton</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Geri Dönüşüm Oranı:</Text> %{data.atikGeriDonusum.geriDonusumOrani}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Dönüştürülemeyen Atık:</Text> %{100 - parseFloat(data.atikGeriDonusum.geriDonusumOrani)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Toplam Karbon Ayak İzi</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Toplam Karbon Ayak İzi:</Text> {data.karbonAyakIzi} kgCO₂e (Avrupa Birliği CBAM standartlarına göre hesaplanmıştır)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Rapor Bilgisi</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Oluşturulma Tarihi:</Text> {new Date(data.createdAt).toLocaleString("tr-TR")}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Rapor No:</Text> {data._id}</Text>
      </View>
    </Page>
  </Document>
);

export default CBAMPdfReport;
