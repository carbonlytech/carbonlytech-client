"use client";
import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import CarbonFootprintCalculator from "@/components/CarbonFootprintCalculator";
import { useRouter } from "next/navigation";

const Dashboard: React.FC=()=>{
    const router=useRouter();

    const [allDetails, setAllDetails] = useState<any[]>([]);

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
        <div>

            <div>
                {Array.isArray(allDetails) && allDetails.map((formData:any,index:any)=>(
                    <div className="flex justify-evenly" key={index}>
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
