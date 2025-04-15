"use client";
import React, { useEffect, useState } from "react";
import { getCarbonDetails } from "../api/carbondetailsService";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const [allDetails, setAllDetails] = useState<any[]>([]);
  const [totalProduction, setTotalProduction] = useState<number>(0);
  const [totalCarbonFootprint, setTotalCarbonFootprint] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const carbonData = await getCarbonDetails(token);
      setAllDetails(carbonData);
    };

    getData();
  }, []);

  useEffect(() => {
    let totalProductionTemp = 0;
    let totalCarbonFootprintTemp= 0;

    allDetails.forEach((formData) => {
      const miktar = parseFloat(formData.firma.miktar || "0");
      totalProductionTemp += miktar;

      const toplamKarbon = parseFloat(formData.karbonAyakIzi || "0");
      totalCarbonFootprintTemp += toplamKarbon;
      
    });

    setTotalProduction(totalProductionTemp);
    setTotalCarbonFootprint(totalCarbonFootprintTemp);
  }, [allDetails]);

  const navigateToDetail = (id: any) => {
    router.push(`detail/${id}`);
  };

  console.log(allDetails)

  return (
    <div className="bg-gray-100 w-full h-screen">
      <div className="w-[80%] h-full mx-auto">


        <div className="text-4xl font-bold py-[3vh] ">Admin Paneli</div>

        <div className="flex justify-center gap-x-[3vw]">

          <div className="flex flex-col gap-y-8 bg-white rounded-2xl w-[25%] p-4 border-t-6 border-blue-600">
            <div className="text-xl">Toplam Ürün</div>

            <div className="text-center">
              <div className="text-5xl text-center font-semibold text-gray-800">{allDetails.length}</div>
              <div className="text-3xl text-center text-green-600 mt-1">↑ 25%</div>
            </div>
          </div>

          <div className="flex flex-col gap-y-8 bg-white rounded-2xl w-[25%] p-4 border-t-6 border-red-600">
            <div className="text-xl">Toplam Üretim Miktarı:</div>

            <div className="text-center">
              <div className="text-5xl text-center font-semibold">{totalProduction} ton</div>
              <div className="text-3xl text-center text-green-600 mt-1">↑ 25%</div>
            </div>
          </div>

          <div className="flex flex-col gap-y-8 bg-white rounded-2xl w-[25%] p-4 border-t-6 border-green-600">
            <div className="text-xl">Toplam Karbon Ayak İzi</div>

            <div className="text-center">
              <div className="text-5xl text-center font-semibold">{totalCarbonFootprint.toFixed(2)} kg CO₂</div>
              <div className="text-3xl text-center text-green-600 mt-1">↑ 25%</div>
            </div>
          </div>

          <div className="flex flex-col gap-y-8 bg-white rounded-2xl w-[25%] p-4 border-t-6 border-yellow-600">
            <div className="text-xl">Toplam Ürün</div>

            <div className="text-center">
              <div className="text-5xl text-center font-semibold">{allDetails.length}</div>
              <div className="text-3xl text-center text-green-600 mt-1">↑ 25%</div>
            </div>
          </div>
          
        </div>

        <div className="flex justify-between">

          <div>
            Grafikler olacak burada
          </div>

          <div>
            {Array.isArray(allDetails) && allDetails.map((item:any,index:any)=>(
              <div className="flex gap-x-4" key={index}>

                <div>
                  {item.firma.urun}
                </div>
                <div>
                  {item.karbonAyakIzi}
                </div>

              </div>
            ))}
          </div>

        </div>


      </div>
    </div>
  );
};

export default Dashboard;
