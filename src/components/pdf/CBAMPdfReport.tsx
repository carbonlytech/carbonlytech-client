import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// PDF stilleri
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
    subtitle: { fontSize: 14, marginBottom: 5, marginTop: 10, textDecoration: "underline" },
    text: { marginBottom: 3 },
  });
  
  // PDF Bileşeni
  const CBAMPdfReport = ({ data }: { data: any }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>CBAM Uyumlu Karbon Ayak İzi Raporu</Text>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Firma Bilgileri</Text>
          <Text style={styles.text}>Lokasyon: {data.firma.lokasyon}</Text>
          <Text style={styles.text}>Sektör: {data.firma.sektor}</Text>
          <Text style={styles.text}>Ürün: {data.firma.urun}</Text>
          <Text style={styles.text}>Üretim Miktarı: {data.firma.miktar} {data.firma.birim}</Text>
          <Text style={styles.text}>Üretim Dönemi: {data.firma.uretimDonem}</Text>
          <Text style={styles.text}>CBAM Kapsamında mı?: {data.firma.cbam ? "Evet" : "Hayır"}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Enerji Tüketimi</Text>
          {data.enerji.elektrikKullaniliyor && (
            <>
              <Text style={styles.text}>Elektrik: {data.enerji.elektrikMiktar} {data.enerji.elektrikBirim}</Text>
              <Text style={styles.text}>Kaynak: {data.enerji.elektrikKaynak}</Text>
              <Text style={styles.text}>Dönem: {data.enerji.elektrikDonem}</Text>
            </>
          )}
          {data.enerji.dogalgazKullaniliyor && (
            <>
              <Text style={styles.text}>Doğalgaz: {data.enerji.dogalgazMiktar} {data.enerji.dogalgazBirim}</Text>
              <Text style={styles.text}>Dönem: {data.enerji.dogalgazDonem}</Text>
            </>
          )}
          {data.enerji.komurKullaniliyor && (
            <>
              <Text style={styles.text}>Kömür: {data.enerji.komurMiktar} {data.enerji.komurBirim}</Text>
              <Text style={styles.text}>Dönem: {data.enerji.komurDonem}</Text>
            </>
          )}
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Yakıt Kullanımı</Text>
          {data.yakitHammadde.yakitlar.map((item: any, i: number) => (
            <Text key={i} style={styles.text}>{item.tip}: {item.miktar} {item.birim} ({item.donem})</Text>
          ))}
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Hammadde Tüketimi</Text>
          {data.yakitHammadde.hammaddeler.map((item: any, i: number) => (
            <Text key={i} style={styles.text}>{item.ad}: {item.miktar} {item.birim} ({item.donem}) - Tedarik: {item.tedarik}</Text>
          ))}
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Emisyon Verileri</Text>
          <Text style={styles.text}>Süreç Tipi: {data.emisyon.surecTipi}</Text>
          <Text style={styles.text}>Emisyon Faktörü: {data.emisyon.emisyonFaktoru} kgCO₂e</Text>
          <Text style={styles.text}>CO₂ Emisyonu: {data.emisyon.co2} kg</Text>
          <Text style={styles.text}>CH₄ Emisyonu: {data.emisyon.ch4} kg</Text>
          <Text style={styles.text}>N₂O Emisyonu: {data.emisyon.n2o} kg</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Atık ve Geri Dönüşüm</Text>
          <Text style={styles.text}>Atık Tipi: {data.atikGeriDonusum.atikTipi}</Text>
          <Text style={styles.text}>Toplam Atık: {data.atikGeriDonusum.atikMiktari} ton</Text>
          <Text style={styles.text}>Geri Dönüşüm Oranı: %{data.atikGeriDonusum.geriDonusumOrani}</Text>
          <Text style={styles.text}>Dönüştürülemeyen Atık: %{100 - parseFloat(data.atikGeriDonusum.geriDonusumOrani)}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Toplam Karbon Ayak İzi</Text>
          <Text style={styles.text}>{data.karbonAyakIzi} kgCO₂e (Avrupa Birliği CBAM standartlarına göre hesaplanmıştır)</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.subtitle}>Rapor Bilgisi</Text>
          <Text style={styles.text}>Oluşturulma Tarihi: {new Date(data.createdAt).toLocaleString("tr-TR")}</Text>
          <Text style={styles.text}>Rapor No: {data._id}</Text>
        </View>
      </Page>
    </Document>
  );

  export default CBAMPdfReport;