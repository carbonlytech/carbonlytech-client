interface StepperProps {
  currentStep: number;
  steps: string[];
  onStepClick: (stepNumber: number) => void;
}

const Stepper = ({ currentStep, steps, onStepClick }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative cursor-pointer"
            onClick={() => onStepClick(stepNumber)}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold z-10
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
            >
              {stepNumber}
            </div>
            <div className="text-xs mt-2 text-center">{label}</div>

            {index !== steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 -z-0">
                <div
                  className={`h-0.5 transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }
                    `}
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
