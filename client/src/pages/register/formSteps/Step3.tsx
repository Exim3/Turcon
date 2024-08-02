import React, { useState, useRef } from "react";
import "../style.css";

export const Step3: React.FC<{
  handleBack: () => void;
  handleNext: () => void;
}> = ({ handleBack, handleNext }) => {
  // State to store values of OTP input fields
  const [otpValues, setOtpValues] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  console.log(otpValues, "otp");
  console.log(otpValues.join(""));

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

  const verifyOtp = () => {
    // Use the getOtpString function to get the concatenated OTP string
    const otpString = getOtpString();
    console.log("OTP String:", otpString); // Output OTP string or handle as needed
    handleNext();
  };

  return (
    <div className="body flex flex-col gap-4 p-4">
      <div className="text-center text-2xl font-semibold">OTP Verification</div>
      <div className="flex-col flex gap-2 items-center">
        <p className="text-sm text-gray-600">
          Please enter the OTP sent to your
        </p>
        <p className="text-sm text-gray-600">
          registered number (+91 9840334503)
          <span className="text-[#9A0000] cursor-pointer" onClick={handleBack}>
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
            onClick={() => alert("Resend OTP clicked")}
          >
            Resend OTP
          </span>
        </p>
      </div>
      <div className="flex justify-center gap-6 ">
        <button
          className="btn btn-secondbtn w-1/2 "
          onClick={() => {
            handleBack();
          }}
          aria-label="Verify OTP"
        >
          Back
        </button>
        <button
          className="btn btn-prime w-1/2 "
          onClick={() => {
            verifyOtp();
          }}
          aria-label="Verify OTP"
        >
          Verify
        </button>
      </div>
    </div>
  );
};
