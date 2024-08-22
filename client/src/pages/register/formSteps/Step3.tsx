import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormGroup } from "../Register";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setRegisterUser } from "../../../store/slice/registeruserSlice";
import { useNavigate } from "react-router";
import { useState } from "react";

export const Step3 = () => {
  const [error, setError] = useState("");
  const registerUser = useAppSelector((state) => state.RegisterUser);

  const [localPhone, setLocalPhone] = useState<string>(
    registerUser.phone || ""
  );

  const handlePhoneChange = (value: string | undefined) => {
    setLocalPhone(value || ""); // Ensure value is a string
    handleInputChange("phone", value || "");
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: string) => {
    dispatch(setRegisterUser({ ...registerUser, [name]: value }));
  };
  const handleNextClick = () => {
    if (!registerUser.phone) {
      setError("Phone number input should not be empty.");
      return;
    }
    navigate("/register/otpverify");
  };

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
              name="phone"
              value={localPhone}
              onChange={handlePhoneChange}
              defaultCountry="US"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded focus-within:outline-none"
            />
          </div>
        </FormGroup>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}

      <div className="flex justify-center gap-6">
        <button className="btn btn-prime w-full" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="text-sm text-center max-w-sm mx-auto text-[#383434]">
        A 4-digit OTP will be sent via SMS to verify your phone number.
      </div>
    </div>
  );
};
