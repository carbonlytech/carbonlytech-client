"use client";
import React, { useEffect, useState } from "react";
import { getOneCarbonDetails } from "@/app/api/carbondetailsService";
import { useParams, useRouter } from "next/navigation";
import Stepper from "@/components/stepsToUpdateDetails/Stepper";
import Step1 from "@/components/stepsToUpdateDetails/Step1";
import Step2 from "@/components/stepsToUpdateDetails/Step2";
import Step3 from "@/components/stepsToUpdateDetails/Step3";
import Step4 from "@/components/stepsToUpdateDetails/Step4";
import Step5 from "@/components/stepsToUpdateDetails/Step5";
import Step6 from "@/components/stepsToUpdateDetails/Step6";
import { ArrowRight } from "lucide-react";

const Detail = () => {
  const params = useParams();
  const formDataId = params.slug;
  const router = useRouter();

  const [carbonDetail, setCarbonDetail] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchFormDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getOneCarbonDetails(token, formDataId);
      setCarbonDetail(data);
      setFormData({
        firma: data.firma,
        enerji: data.enerji,
        yakitHammadde: data.yakitHammadde,
        emisyon: data.emisyon,
        atikGeriDonusum: data.atikGeriDonusum,
        karbonAyakIzi: data.karbonAyakIzi,
      });
    };

    fetchFormDetail();
  }, [formDataId]);

  const steps = [
    "Firma",
    "Enerji",
    "Yakit & Hammadde",
    "Emisyon",
    "Geri Dönüşüm",
    "Özet",
  ];

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  if (!carbonDetail || !formData)
    return <div className="text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl rounded-2xl bg-white">
      <Stepper
        currentStep={step}
        steps={steps}
        onStepClick={(stepNumber) => setStep(stepNumber)}
      />

      {step === 1 && (
        <Step1
          nextStep={nextStep}
          formData={formData.firma}
          update={(data) => updateFormData("firma", data)}
        />
      )}

      {step === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData.enerji}
          update={(data) => updateFormData("enerji", data)}
        />
      )}

      {step === 3 && (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData.yakitHammadde}
          update={(data) => updateFormData("yakitHammadde", data)}
        />
      )}

      {step === 4 && (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData.emisyon}
          update={(data) => updateFormData("emisyon", data)}
        />
      )}

      {step === 5 && (
        <Step5
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData.atikGeriDonusum}
          update={(data) => updateFormData("atikGeriDonusum", data)}
        />
      )}

      {step === 6 && (
        <Step6
          prevStep={prevStep}
          formData={formData}
          update={(data) => updateFormData("karbonAyakIzi", data)}
        />
      )}

      <div className="flex justify-between pt-4 ml-[15vw]">
        <button
          onClick={navigateToDashboard}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Dashboard
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Detail;
