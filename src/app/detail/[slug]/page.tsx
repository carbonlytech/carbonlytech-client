"use client";
import { getOneCarbonDetails } from "@/app/api/carbondetailsService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const [carbonDetail, setCarbonDetail] = useState<any>();

  const params = useParams();
  const formDataId = params.slug;

  useEffect(() => {
    const fetchFormDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getOneCarbonDetails(token, formDataId);
      setCarbonDetail(data);
    };

    fetchFormDetail();
  }, []);

  console.log(carbonDetail);

  return (
    <div>
        {carbonDetail && 
            <div>
                {carbonDetail.firma.urun}
            </div>
        }
    </div>
  );
};

export default Detail;
