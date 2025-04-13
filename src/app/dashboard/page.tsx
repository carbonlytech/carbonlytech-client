"use client";
import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import CarbonFootprintCalculator from "@/components/CarbonFootprintCalculator";

const Dashboard: React.FC=()=>{

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

    console.log(allDetails);

    return (
        <div>

            <div>
                {allDetails && allDetails.map((formData:any,index:any)=>(
                    <div className="flex justify-evenly" key={index}>
                        <div>
                            {formData.firma.urun}
                        </div>

                        <div>
                            <CarbonFootprintCalculator formData={formData}/>
                        </div>

                        <div>
                            <div>Report</div>
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    )
}

export default Dashboard;