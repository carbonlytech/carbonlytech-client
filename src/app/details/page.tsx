"use client";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import { useState } from "react";

const Details: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    firma: {},
    enerji: {},
    yakitHammadde: {},
    emisyon: {},
    atikGeriDonusum: {}
  });

  console.log(formData);

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
    </div>
  );
};

export default Details;
