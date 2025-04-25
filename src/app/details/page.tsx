"use client";
import { useState } from "react";

import Step1 from "@/components/stepsToAddDetails/Step1";
import Step2 from "@/components/stepsToAddDetails/Step2";
import Step3 from "@/components/stepsToAddDetails/Step3";
import Step4 from "@/components/stepsToAddDetails/Step4";
import Step5 from "@/components/stepsToAddDetails/Step5";
import Step6 from "@/components/stepsToAddDetails/Step6";
import Stepper from "@/components/stepsToAddDetails/Stepper";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar/page";

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
    <div className=" mx-auto bg-white">

      <div className="flex gap-x-[5vw]">

        <div className="w-[12%] sticky top-0 h-screen bg-white shadow-md">
          <Navbar />
        </div>

        <div className="w-[80%] pt-[2%]">

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

        </div>

      </div>

    </div>
  );
};

export default Details;
