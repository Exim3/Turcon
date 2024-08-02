import { FormGroup } from "../Register";

export const Step4: React.FC<{
  handleBack: () => void;
  handleNext: () => void;
}> = ({ handleBack, handleNext }) => (
  <div className="body flex flex-col gap-4">
    <div className="text-center text-2xl">Company Details</div>
    <div className="flex-col flex gap-2">
      <FormGroup label="Company Name">
        <input
          type="text"
          placeholder="Enter Your Company Name"
          className="input input-bordered rounded w-full placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
        />
      </FormGroup>
      <FormGroup label="Company Address">
        <textarea
          className="textarea textarea-info rounded placeholder:text-xs  w-full mx-auto max-w-md md:max-w-none  border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
          placeholder="Enter Your Company Address"
        ></textarea>
      </FormGroup>
      <FormGroup label="Country">
        <select className="select select-primary w-full rounded mx-auto max-w-sm  md:max-w-none border-[#DFE1E6]  focus:outline-none active:border-[#11A3FF] hover:border-[#11A3FF] focus:border-[#11A3FF] text-[#7A869A]">
          <option disabled selected>
            Select Country
          </option>
          <option>India</option>
          <option>Canada</option>
          <option>U.S</option>
        </select>
      </FormGroup>

      <FormGroup label="Website(Optional)">
        <input
          type="text"
          placeholder="Enter Your website url"
          className="input input-bordered w-full rounded placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
        />
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
  </div>
);
