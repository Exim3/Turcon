import EyeIcon, { EyeCloseIcon } from "../../../components/svg/Eye";
import { FormGroup } from "../Register";

export const Step1: React.FC<{
  isEyeOpen: boolean;
  toggleEye: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}> = ({ isEyeOpen, toggleEye, handleNext, handleSubmit }) => {
  const onNext = () => {
    handleSubmit();
    handleNext();
  };
  return (
    <div className="body flex flex-col gap-4">
      <div className="text-center text-2xl">Register</div>
      <div className="flex-col flex gap-2">
        <FormGroup label="Username">
          <input
            type="text"
            placeholder="Enter Your Username"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
          />
        </FormGroup>
        <FormGroup label="Full Name">
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
          />
        </FormGroup>

        <FormGroup label="Email">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
          />
        </FormGroup>
        <FormGroup label="Password">
          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              placeholder="Enter Your Password"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
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
              placeholder="Confirm Your Password"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
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
          <input type="checkbox" defaultChecked id="terms" />
          <label htmlFor="terms">
            Accept the{" "}
            <span className="text-[#005E99] font-semibold">
              Terms and Conditions
            </span>
          </label>
        </div>
      </div>
      <div className="btn btn-prime" onClick={onNext}>
        Next
      </div>
    </div>
  );
};
