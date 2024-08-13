import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Step1 } from "./formSteps/Step1";
import { Step2 } from "./formSteps/Step2";
import { Step3 } from "./formSteps/Step3";
import { Step4 } from "./formSteps/Step4";
import { Step5 } from "./formSteps/Step5";
import { useBack } from "../../utils/useBack";
import cancelIcon from "/x.svg";
import Logo from "/logo.svg";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setRegisterUser } from "../../store/slice/registeruserSlice";

const Register: React.FC = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useAppDispatch();
  const registerUser = useAppSelector((state) => state.RegisterUser);
  const [error, setError] = useState("");

  const toggleEye = () => {
    setIsEyeOpen((prev) => !prev);
  };

  const handleChange = (name: string, value: string) => {
    dispatch(setRegisterUser({ ...registerUser, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Final data submission:", registerUser);
    // Implement actual submission logic here
  };

  const inititalDataSumbmit = (termCheck: boolean) => {
    console.log("Initial data:", registerUser);
    if (registerUser.password !== registerUser.confirmPassword) {
      setError("Password & Confirm Password doesn't match");
      return;
    }
    if (!registerUser.password) {
      setError("Password cannot be empty");
      return;
    }
    if (!termCheck) {
      setError("Please accept the terms and conditions to proceed.");
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
    setError("");
  };

  const handleNextStepTwo = () => {
    console.log(registerUser, "phone");
    if (!registerUser.phone) {
      setError("Phone number input should not be empty.");
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const goback = useBack();

  return (
    <div className="bg-white w-full">
      <div className="p-5">
        <div className="py-6 border px-5 lg:px-8 gap-3 flex flex-col justify-center w-full sm:w-[556px] mx-auto relative">
          <div className="w-28 mx-auto">
            <img src={Logo} alt="Logo" />
          </div>
          <div
            onClick={goback}
            className="cursor-pointer absolute top-3 right-3 bg-[#e4e4e4] w-8 h-8 flex items-center justify-center rounded-md"
          >
            <img src={cancelIcon} alt="Cancel" />
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
              handleChange={handleChange}
              handleSubmit={inititalDataSumbmit}
              error={error}
              username={registerUser.username || ""}
              fullName={registerUser.fullName || ""}
              password={registerUser.password || ""}
              confirmPassword={registerUser.confirmPassword || ""}
              email={registerUser.email || ""}
            />
          )}
          {currentStep === 2 && (
            <Step2
              handleBack={handleBack}
              handleNext={handleNextStepTwo}
              handleChange={handleChange}
              phone={registerUser.phone || ""}
              setError={setError}
              error={error}
            />
          )}
          {currentStep === 3 && (
            <Step3 handleBack={handleBack} handleNext={handleNext} />
          )}
          {currentStep === 4 && (
            <Step4 handleBack={handleBack} handleNext={handleNext} />
          )}
          {currentStep === 5 && (
            <Step5 handleBack={handleBack} handleSubmit={handleSubmit} />
          )}
          {currentStep === 1 && (
            <>
              <div className="divider">or</div>
              <div className="text-center text-xs">
                <p>
                  Already have an account?{" "}
                  <span className="text-[#005E99] font-semibold">
                    <Link to="/login">Login</Link>
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

export default Register;

export const FormGroup: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="form-group flex flex-col gap-3">
    <label className="block w-full">{label}</label>
    {children}
  </div>
);
