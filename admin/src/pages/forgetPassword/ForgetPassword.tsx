import React, { ChangeEvent, useState } from "react";
import { BackIcon } from "../../components/svg/Tick";
import { useBack } from "../../utils/useBack";
import Logo from "/logo.svg";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

type Data = {
  email: string;
};

const ForgetPassword: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Data, setData] = useState<Data>({
    email: "",
  });

  const goback = useBack();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/api/admin/forgetpassword",
        Data
      );
      console.log(response);
      console.log(response.data?.message);
      const msg = response.data?.message;
      toast.success(msg);
      setError("");
    } catch (error: any) {
      console.error("forgetpassword error:", error);
      console.error("Error message:", error.response?.data?.error);
      const err = error.response?.data?.error;
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-white w-full h-screen flex items-center justify-center">
        <div className="relative w-full max-w-md p-8 bg-white border rounded-lg shadow-lg">
          <div
            className="absolute top-3 left-3 cursor-pointer bg-[#e4e4e4] w-8 h-8 flex items-center justify-center rounded-md"
            onClick={goback}
          >
            <BackIcon color="#232323" />
          </div>
          <div className="w-28 mx-auto mb-6">
            <img src={Logo} alt="Turcon Logo" />
          </div>
          <div className="text-center text-2xl mb-4">Enter Your Email</div>
          <div className="flex flex-col gap-4">
            <div className="form-group flex flex-col gap-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={Data.email}
                placeholder="Enter your email"
                className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-primary focus:outline-none"
                onChange={handleInputChange}
              />
            </div>
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
                "Send Link"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
