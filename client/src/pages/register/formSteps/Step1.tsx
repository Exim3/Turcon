import { ChangeEvent, useState } from "react";
import EyeIcon, { EyeCloseIcon } from "../../../components/svg/Eye";
import { FormGroup } from "../Register";
import {
  deleteRegisterUser,
  setRegisterUser,
} from "../../../store/slice/registeruserSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomSuccessToast } from "../../../utils/CustomToast";

import axiosInstance from "../../../utils/axiosInstance";

export const Step1 = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [istermschecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const registerUser = useAppSelector((state) => state.RegisterUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setRegisterUser({ ...registerUser, [name]: value }));
  };

  const handleTermsChange = () => {
    setTermsChecked((prev) => !prev);
  };

  const handleNext = async () => {
    const { password, fullName, username, email, confirmPassword } =
      registerUser;

    if (!password || !fullName || !username || !email || !confirmPassword) {
      setError("Please fill all the inputs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password & Confirm Password don't match");
      return;
    }

    if (!istermschecked) {
      setError("Please accept the terms and conditions to proceed.");
      return;
    }
    setError("");
    try {
      setIsLoading(true);
      const result = await axiosInstance.post("/api/auth/signup", {
        fullName,
        username,
        email,
        password,
      });
      const { message, user, userId } = result.data;

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (userId) localStorage.setItem("userId", userId);

      if (message) {
        toast(<CustomSuccessToast message={message} />);
        navigate("/register/verifymail");
      }

      dispatch(deleteRegisterUser());
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "An error occurred");
      return;
    } finally {
      setIsLoading(false);
    }

    setError("");
  };

  return (
    <>
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
              value={registerUser.username}
            />
          </FormGroup>
          <FormGroup label="Full Name">
            <input
              type="text"
              name="fullName"
              placeholder="Enter Your Full Name"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
              onChange={handleInputChange}
              value={registerUser.fullName}
            />
          </FormGroup>
          <FormGroup label="Email">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
              onChange={handleInputChange}
              value={registerUser.email}
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
                value={registerUser.password}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setIsEyeOpen((prev) => !prev)}
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
                value={registerUser.confirmPassword}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setIsEyeOpen((prev) => !prev)}
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
          className={`btn btn-prime   disabled:bg-[#aaaaaa]`}
          onClick={handleNext}
          disabled={isLoading || !istermschecked}
        >
          {isLoading ? (
            <span className="loading loading-bars loading-sm  bg-primary"></span>
          ) : (
            "Next"
          )}
        </button>
      </div>
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
  );
};
