import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormGroup } from "../Register";

export const Step2: React.FC<{
  handleBack: () => void;
  handleNext: () => void;
}> = ({ handleBack, handleNext }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  console.log(value, "value");

  return (
    <div className="body flex flex-col gap-4">
      <div className="text-center text-2xl max-w-sm mx-auto">
        Enter Your Phone Number to Continue
      </div>
      <div className="flex flex-col gap-2">
        <FormGroup label="Phone Number">
          <div className="flex items-center gap-2">
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              defaultCountry="US"
              className="input input-bordered w-full placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded focus-within:outline-none"
            />
          </div>
        </FormGroup>
      </div>
      <div className="flex justify-center gap-6 ">
        <div className="btn btn-secondbtn w-1/2 " onClick={handleBack}>
          Back
        </div>
        <div className="btn btn-prime w-1/2 " onClick={handleNext}>
          Next
        </div>
      </div>
      <div className="text-sm text-center max-w-sm mx-auto text-[#383434]">
        A 4-digit OTP will be sent via SMS to verify your phone number.
      </div>
    </div>
  );
};
