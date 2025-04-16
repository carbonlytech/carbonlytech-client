"use client";
import { useState } from "react";

import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import Step6 from "@/components/Step6";
import Stepper from "@/components/Stepper";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Details: React.FC = () => {
  const router=useRouter();
  const navigateToDashboard=()=>{
    router.push("dashboard");
  }

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firma: {},
    enerji: {},
    yakitHammadde: {},
    emisyon: {},
    atikGeriDonusum: {},
    karbonAyakIzi: null,
  });

  const steps = [
    "Firma",
    "Enerji",
    "Yakit & Hammadde",
    "Emisyon",
    "Geri Dönüşüm",
    "Özet",
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  console.log(formData);

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

      {/* Buton */}
      <div className="flex justify-between pt-4 ml-[15vw]">
        <button
          onClick={()=>navigateToDashboard()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Dashboard
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default Details;
