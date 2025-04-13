"use client"

import { getCarbonDetails, sendCarbonDetails } from "@/app/api/carbondetailsService";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const Middleware: React.FC=()=>{
    const router=useRouter();

    const testingFormData={
        "firma": {
            "lokasyon": "Türkiye,Kocaeli",
            "sektor": "Demir-çelik",
            "cbam": true,
            "urun": "Sıcak Haddelenmiş Çelik Rulo",
            "miktar": "12500",
            "birim": "ton",
            "uretimDonem": "yillik"
        },
        "enerji": {
            "elektrikKullaniliyor": true,
            "dogalgazKullaniliyor": true,
            "komurKullaniliyor": false,
            "elektrikMiktar": "1200000",
            "dogalgazMiktar": "350000",
            "komurMiktar": "",
            "elektrikBirim": "kWh",
            "dogalgazBirim": "m³",
            "komurBirim": "ton",
            "elektrikKaynak": "sebekeden",
            "elektrikDonem": "yillik",
            "dogalgazDonem": "yillik",
            "komurDonem": "yillik"
        },
        "yakitHammadde": {
            "yakitlar": [
                {
                    "tip": "Motorin",
                    "miktar": "15000",
                    "birim": "litre",
                    "donem": "yillik"
                },
                {
                    "tip": "Fuel Oil",
                    "miktar": "8000",
                    "birim": "litre",
                    "donem": "yillik"
                }
            ],
            "hammaddeler": [
                {
                    "ad": "Hurda Demir",
                    "miktar": "20000",
                    "birim": "ton",
                    "donem": "yillik",
                    "tedarik": "yerli"
                },
                {
                    "ad": "Kireçtaşı",
                    "miktar": "5000",
                    "birim": "ton",
                    "tedarik": "yerli"
                }
            ]
        },
        "emisyon": {
            "surecTipi": "yüksek-firin",
            "emisyonFaktoru": "2.1",
            "co2": "150.000",
            "ch4": "2500",
            "n2o": "1200"
        },
        "atikGeriDonusum": {
            "atikMiktari": "850",
            "geriDonusumOrani": "70",
            "atikTipi": "metal"
        }
    }

    useEffect(()=>{
        const token=localStorage.getItem("token");

        if(token){
            try {
                const waitForAsync=async()=>{
                    const checking=await getCarbonDetails(token);    //test için verilmiş servis kontrol ediyor aslında geçerliliğini tokenın çünkü bazen olsa da süresi geçiyor
                    if(checking.statusCode===401){
                        localStorage.removeItem("token");
                        router.push("/user/signin");
                    }else{
                        
                    }
                }

                waitForAsync();
            } catch (error) {
                console.log(error);
            }
        }else{
            router.push("/user/signin");
        }
    },[router]);
    

    return null;
}

export default Middleware;