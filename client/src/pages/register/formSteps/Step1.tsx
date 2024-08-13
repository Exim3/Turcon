import React, { ChangeEvent, useState } from "react";
import EyeIcon, { EyeCloseIcon } from "../../../components/svg/Eye";
import { FormGroup } from "../Register";

interface Step1Props {
  isEyeOpen: boolean;
  toggleEye: () => void;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (termCheck: boolean) => void;
  error: string;
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const Step1: React.FC<Step1Props> = ({
  isEyeOpen,
  toggleEye,
  handleChange,
  handleSubmit,
  password,
  confirmPassword,
  error,
  fullName,
  username,
  email,
}) => {
  const [istermschecked, setTermsChecked] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleTermsChange = () => {
    setTermsChecked((prev) => !prev);
  };
  const handleNext = () => {
    handleSubmit(istermschecked);
  };

  return (
    <div className="body flex flex-col gap-4">
      <div className="text-center text-2xl">Register</div>
      <div className="flex-col flex gap-2">
        <FormGroup label="Username">
          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
            onChange={handleInputChange}
            value={username}
          />
        </FormGroup>

        <FormGroup label="Full Name">
          <input
            type="text"
            name="fullName"
            placeholder="Enter Your Full Name"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
            onChange={handleInputChange}
            value={fullName}
          />
        </FormGroup>

        <FormGroup label="Email">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
            onChange={handleInputChange}
            value={email}
          />
        </FormGroup>

        <FormGroup label="Password">
          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
              onChange={handleInputChange}
              value={password}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={toggleEye}
              aria-label={isEyeOpen ? "Hide password" : "Show password"}
            >
              {isEyeOpen ? <EyeIcon size={24} /> : <EyeCloseIcon size={24} />}
            </div>
          </div>
        </FormGroup>

        <FormGroup label="Confirm Password">
          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Your Password"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
              onChange={handleInputChange}
              value={confirmPassword}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={toggleEye}
              aria-label={isEyeOpen ? "Hide password" : "Show password"}
            >
              {isEyeOpen ? <EyeIcon size={24} /> : <EyeCloseIcon size={24} />}
            </div>
          </div>
        </FormGroup>

        <div className="text-sm text-center flex items-center gap-1">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={istermschecked}
            onChange={handleTermsChange}
          />
          <label htmlFor="terms">
            Accept the{" "}
            <span className="text-[#005E99] font-semibold">
              Terms and Conditions
            </span>
          </label>
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        className={`${!istermschecked && "disabled"} btn btn-prime di`}
        onClick={() => handleNext()}
      >
        Next
      </button>
    </div>
  );
};
