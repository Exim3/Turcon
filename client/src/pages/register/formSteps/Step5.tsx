import { ChangeEvent, useState } from "react";
import { useCountrycode } from "../../../utils/useCountryCode";
import { FormGroup } from "../Register";
import DragFile from "../../../components/dragFiles/DragFile";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router";
import {
  deleteRegisterUser,
  setRegisterUser,
} from "../../../store/slice/registeruserSlice";
import axios from "axios";
import { CustomSuccessToast } from "../../../utils/CustomToast";
import { toast } from "react-toastify";

export const Step5 = () => {
  const countries = useCountrycode();
  const [isnext, setIsNext] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const registerUser = useAppSelector((state) => state.RegisterUser);

  const handleNext = () => {
    if (
      !registerUser.companyAddress ||
      !registerUser.companyName ||
      !registerUser.country
    ) {
      setError("Please Fill All The Fields");
      return;
    }
    setError("");
    setIsNext(false);
  };
  const handleBack = () => {
    setIsNext(true);
  };
  const handleSubmit = async () => {
    if (!registerUser.document) {
      setError("Please upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("document", registerUser.document);
    formData.append("companyName", registerUser.companyName || "");
    formData.append("companyAddress", registerUser.companyAddress || "");
    formData.append("website", registerUser.website || "");
    formData.append("country", registerUser.country || "");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/signup/updatedocument?userId=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast(<CustomSuccessToast message={response.data.message} />);
      dispatch(deleteRegisterUser());
      navigate("/");
    } catch (err) {
      console.log(err, "error");
      const axiosError = err?.response?.data?.error || "An error occurred.";
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setRegisterUser({ ...registerUser, [name]: value }));
  };
  console.log(registerUser.document, "docs");

  // const UpdateDocument = async () => {
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     setError("user not found login again with your registered details");
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);

  //     const updatedocument = await axios.put(
  //       "http://localhost:5000/api/auth/signup/updatedocument",
  //       {
  //         companyName: registerUser.companyName,
  //         companyAddress: registerUser.companyAddress,
  //         website: registerUser.website,
  //         country: registerUser.country,
  //       },
  //       {
  //         params: { userId: userId },
  //       }
  //     );
  //     const msg = updatedocument.data?.message;
  //     toast(<CustomSuccessToast message={msg} />);
  //     navigate("/register/document");
  //   } catch (err) {
  //     console.log(err, "error");
  //     const axiosError = err?.response?.data?.error;
  //     setError(axiosError);
  //     return;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {isnext ? (
        <div className="body flex flex-col gap-4">
          <div className="text-center text-2xl">Company Details</div>{" "}
          <div className="flex-col flex gap-2">
            {" "}
            <FormGroup label="Company Name">
              <input
                type="text"
                placeholder="Enter Your Company Name"
                className="input input-bordered rounded w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-secondary focus:outline-none focus:border-secondary"
                name="companyName"
                value={registerUser.companyName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup label="Company Address">
              <textarea
                className="textarea textarea-info rounded placeholder:text-sm  w-full mx-auto max-w-md md:max-w-none  border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-secondary focus:outline-none focus:border-secondary "
                placeholder="Enter Your Company Address"
                name="companyAddress"
                value={registerUser.companyAddress}
                onChange={handleInputChange}
              ></textarea>
            </FormGroup>
            <FormGroup label="Country">
              <select
                className="select select-primary w-full rounded mx-auto max-w-sm  md:max-w-none border-[#DFE1E6]  focus:outline-none active:border-secondary focus:border-secondary text-[#7A869A] hover:bg-[#EBECF0] hover:border-none"
                name="country"
                onChange={handleInputChange}
              >
                <option value={""} disabled selected>
                  {registerUser.country
                    ? registerUser.country
                    : "Select Country"}
                </option>
                {countries.map((country) => (
                  <option key={country.iso} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup label="Website(Optional)">
              <input
                type="text"
                name="website"
                value={registerUser.website}
                onChange={handleInputChange}
                placeholder="Enter Your website url"
                className="input input-bordered w-full rounded placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-secondary focus:outline-none focus:border-secondary"
              />
            </FormGroup>
          </div>
          {error && <p className="text-error text-xs">{error}</p>}
          <div className="flex justify-center gap-6 ">
            <div className="btn btn-prime w-full " onClick={handleNext}>
              Next
            </div>
          </div>
        </div>
      ) : (
        <div className="body flex flex-col gap-4">
          <div className="text-center text-2xl">File Attachments</div>
          <div className="flex-col flex gap-2">
            <div className="text-md font-semibold text-center">
              Upload Company Registration or Incorporation or Tax Certificate
            </div>
            <DragFile />
          </div>
          {error && <p className="text-error text-xs">{error}</p>}

          <div className="flex justify-center gap-6 ">
            <div className="btn btn-secondbtn w-1/2 " onClick={handleBack}>
              Back
            </div>
            <button
              className="btn btn-prime w-1/2 disabled:bg-[#aaaaaa]"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-bars loading-sm  bg-primary"></span>
              ) : (
                "Submit"
              )}{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
