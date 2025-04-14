"use client";
import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import CarbonFootprintCalculator from "@/components/CarbonFootprintCalculator";
import { useRouter } from "next/navigation";

const Dashboard: React.FC=()=>{
    const router=useRouter();

    const [allDetails, setAllDetails] = useState<any[]>([]);

    //Toplam üretilen miktarı hesaplamak için
    let totalProduction=0;

    allDetails.forEach((formData)=>{
        const miktar=parseFloat(formData.firma.miktar || "0");
        totalProduction=totalProduction+miktar;
    });
    //Toplam üretilen miktarı hesaplamak için buraya kdr

    useEffect(()=>{
        const getData=async()=>{
            const token=localStorage.getItem("token");
            if(!token) return;

            const carbonData=await getCarbonDetails(token);
            setAllDetails(carbonData);
        }

        getData();
    },[]);

    const navigateToDetail=(id: any)=>{
        router.push(`detail/${id}`)
    }

    console.log(allDetails);

    return (
        <div className="flex flex-col justify-center items-center">

            <div>Admin Paneli</div>

            <div>
                <div>Toplam Ürün: {allDetails.length}</div>
                <div>Toplam Üretim Miktarı: {totalProduction}</div>
                <div>Toplam Karbon Ayak İzi: </div>
            </div>

            <div>
                {Array.isArray(allDetails) && allDetails.map((formData:any,index:any)=>(
                    <div className="flex gap-x-[20vw] mt-[5vh]" key={index}>
                        <div>
                            {formData.firma.urun}
                        </div>

                        <div>
                            <CarbonFootprintCalculator formData={formData}/>
                        </div>

                        <div onClick={()=>navigateToDetail(formData._id)}>
                            <div>Report and Graph</div>
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    )
}

export default Dashboard;
