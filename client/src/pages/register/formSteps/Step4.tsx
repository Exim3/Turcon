import React, { useState, useRef } from "react";
import "../style.css";
import { useAppSelector } from "../../../store/store";
import { useBack } from "../../../utils/useBack";
import { CustomSuccessToast } from "../../../utils/CustomToast";
import { toast } from "react-toastify";

import { useNavigate } from "react-router";
import axiosInstance from "../../../utils/axiosInstance";

export const Step4 = () => {
  // State to store values of OTP input fields
  const [otpValues, setOtpValues] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const registerUser = useAppSelector((state) => state.RegisterUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState("");

  const goback = useBack();
  const navigate = useNavigate();

  const handleBack = () => {
    goback();
  };
  const verifyOtp = () => {
    // Use the getOtpString function to get the concatenated OTP string
    const otpString = getOtpString();
    //verify process

    UpdatePhone();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    // Allow only one digit
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Move to the next input if a digit is entered
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Clear the input if not a valid digit
      event.target.value = "";
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to the previous input on backspace if the current input is empty
    if (
      event.key === "Backspace" &&
      index > 0 &&
      event.currentTarget.value === ""
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  // Combine all OTP values into a single string
  const getOtpString = () => otpValues.join("");
  const UpdatePhone = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("user not found login again with your registered details");
      return;
    }
    try {
      setIsLoading(true);

      const updatePhone = await axiosInstance.put(
        "/api/auth/signup/updatephone",
        { phone: registerUser.phone },
        {
          params: { userId: userId },
        }
      );
      const msg = updatePhone.data?.message;
      toast(<CustomSuccessToast message={msg} />);
      navigate("/register/document");
    } catch (err: any) {
      console.error(err, "error");
      const axiosError = err?.response?.data?.error;
      setError(axiosError);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body flex flex-col gap-4 p-4">
      <div className="text-center text-2xl font-semibold">OTP Verification</div>
      <div className="flex-col flex gap-2 items-center">
        <p className="text-sm text-gray-600">
          Please enter the OTP sent to your
        </p>
        <p className="text-sm text-gray-600">
          Registered Number : {registerUser.phone}
          <span className="text-[#9A0000] cursor-pointer" onClick={handleBack}>
            {" "}
            Edit
          </span>
        </p>

        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="otp-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              aria-label={`OTP digit ${index + 1}`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn't receive the OTP?
          <span
            className="text-[#008FE8] font-semibold cursor-pointer"
            onClick={() =>
              toast(<CustomSuccessToast message={"Otp has been sent"} />)
            }
          >
            {""} Resend OTP
          </span>
        </p>
      </div>
      {error && <p className="text-error text-center text-xs">{error}</p>}

      <div className="flex justify-center gap-6 ">
        <button
          className="btn btn-prime w-full "
          onClick={() => {
            verifyOtp();
          }}
          aria-label="Verify OTP"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-bars loading-sm  bg-primary"></span>
          ) : (
            "Verify"
          )}
        </button>
      </div>
    </div>
  );
};
