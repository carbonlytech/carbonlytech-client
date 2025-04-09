"use client";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import { useState } from "react";

const Details: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firma: {},
    enerji: {},
    yakitHammadde: {},
    emisyon: {},
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl rounded-2xl bg-white">
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          prevStep={prevStep}
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
    </div>
  );
};

export default Details;