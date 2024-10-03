import React, { ChangeEvent, useState } from "react";
import Logo from "/logo.svg";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import EyeIcon, { EyeCloseIcon } from "../../components/svg/Eye";
import { useNavigate, useParams } from "react-router";

type Data = {
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Data, setData] = useState<Data>({
    newPassword: "",
    confirmPassword: "",
  });

  const { id } = useParams();

  const ToggleEye = () => {
    setIsEyeOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { newPassword, confirmPassword } = Data;
    if (newPassword !== confirmPassword)
      return setError("New Password & Confirm Password doesn't match");
    console.log(newPassword, "pass");
    try {
      setIsLoading(true);
      const response = await axiosInstance.put("/api/admin/resetpassword", {
        password: newPassword,
        userId: id,
      });
      console.log(response);
      console.log(response.data?.message);
      const msg = response.data?.message;
      toast.success(msg);
      setError("");
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (error: any) {
      console.error("changePassword error:", error);
      console.error("Error message:", error.response?.data?.error);
      const err = error.response?.data?.error;
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white w-full h-screen flex items-center justify-center">
      <div className="relative w-full max-w-md p-8 bg-white border rounded-lg shadow-lg">
        <div className="w-28 mx-auto mb-6">
          <img src={Logo} alt="Turcon Logo" />
        </div>
        <div className="text-center text-2xl mb-4">Reset Your Password</div>
        <div className="flex flex-col gap-4">
          <div className="form-group flex flex-col gap-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="newPassword"
                value={Data.newPassword}
                placeholder="Enter your new password"
                className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6]  active:border-primary focus:outline-none"
                onChange={handleInputChange}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={ToggleEye}
              >
                {isEyeOpen ? <EyeIcon size={24} /> : <EyeCloseIcon size={24} />}
              </div>
            </div>
          </div>
          <div className="form-group flex flex-col gap-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="confirmPassword"
                value={Data.confirmPassword}
                placeholder="Enter your confirm password"
                className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6]  active:border-primary focus:outline-none"
                onChange={handleInputChange}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={ToggleEye}
              >
                {isEyeOpen ? <EyeIcon size={24} /> : <EyeCloseIcon size={24} />}
              </div>
            </div>
          </div>
          {/* <div className="text-end text-xs text-primary">
              <Link
                to="/forgot-password"
                className="text-[#005E99] font-semibold"
              >
                Forget Password?
              </Link>
            </div> */}
        </div>
        {error && <p className="text-error text-xs mt-1">{error}</p>}

        <div className="mt-6">
          <button
            className="btn btn-prime w-full py-2 px-4 text-white disabled:bg-[#aaaaaa]"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-bars loading-sm  bg-primary"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
