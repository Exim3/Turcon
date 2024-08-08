import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Step1 } from "./formSteps/Step1";
import { Step3 } from "./formSteps/Step3";
import { Step2 } from "./formSteps/Step2";
import { Step4 } from "./formSteps/Step4";
import { Step5 } from "./formSteps/Step5";
import { useBack } from "../../utils/useBack";

const Register: React.FC = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // State to manage the

  const toggleEye = () => {
    setIsEyeOpen((prev) => !prev);
  };

  const handleNext = () => {
    // Move to the next step
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    // Move to the previous step
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  const handleSubmit = () => {
    console.log("data");
  };
  const inititalDataSumbmit = () => {
    console.log("initital");
  };
  const goback = useBack();

  return (
    <div className="bg-white w-full">
      <div className="h-8 flex flex-row-reverse mt-2 justify-between container">
        <div onClick={goback} className="cursor-pointer">
          <img src="/x.svg" alt="Logo" />
        </div>
      </div>

      <div className="px-5">
        <div className="py-6 border px-5 lg:px-8 gap-3 flex flex-col justify-center w-full sm:w-[556px] mx-auto">
          <div className="w-28 mx-auto">
            <img src="/logo.svg" alt="Logo" />
          </div>
          {currentStep >= 2 && (
            <div className="flex justify-center gap-1">
              <div
                className={`h-2 w-1/12  ${
                  currentStep >= 2 ? "bg-[#005E99]" : "bg-[#D9D9D9]"
                }  rounded-l-lg`}
              ></div>
              <div
                className={`h-2 w-1/12 ${
                  currentStep >= 3 ? "bg-[#005E99]" : "bg-[#D9D9D9]"
                } `}
              ></div>
              <div
                className={`h-2 w-1/12 ${
                  currentStep >= 4 ? "bg-[#005E99]" : "bg-[#D9D9D9]"
                } `}
              ></div>
              <div
                className={`h-2 w-1/12 ${
                  currentStep >= 5 ? "bg-[#005E99]" : "bg-[#D9D9D9]"
                } rounded-r-lg`}
              ></div>
            </div>
          )}
          {currentStep === 1 && (
            <Step1
              isEyeOpen={isEyeOpen}
              toggleEye={toggleEye}
              handleNext={handleNext}
              handleSubmit={inititalDataSumbmit}
            />
          )}
          {currentStep === 2 && (
            <Step2 handleBack={handleBack} handleNext={handleNext} />
          )}
          {currentStep === 3 && (
            <Step3 handleBack={handleBack} handleNext={handleNext} />
          )}
          {currentStep === 4 && (
            <Step4 handleBack={handleBack} handleNext={handleNext} />
          )}
          {currentStep === 5 && (
            <Step5 handleBack={handleBack} handleSumbit={handleSubmit} />
          )}
          {currentStep === 1 && (
            <>
              <div className="divider">or</div>
              <div className="text-center text-xs">
                <p>
                  Already have an Account ?{" "}
                  <span className="text-[#005E99] font-semibold">
                    <Link to={"/login"}> Login</Link>{" "}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="form-group flex flex-col gap-3">
    <label className="block w-full">{label}</label>
    {children}
  </div>
);

export default Register;
