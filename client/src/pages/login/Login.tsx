import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EyeIcon, { EyeCloseIcon } from "../../components/svg/Eye";
import { BackIcon } from "../../components/svg/Tick";
import { useBack } from "../../utils/useBack";
import Logo from "/logo.svg";

import { useAuth } from "../../utils/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

type LoginData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const goback = useBack();
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const ToggleEye = () => {
    setIsEyeOpen((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/login", loginData);

      // Access token from the response headers
      const token = response.headers["x-auth-token"];

      if (token) {
        // Use context to handle token
        login(token);

        // Navigate to the desired page
        navigate("/buy/inventory");
      } else {
        console.error("Token not received");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error message:", error.response?.data?.error);

      const registerError = error.response?.data?.error; // Error for username or other issues
      const goToRegister = error.response?.data?.verify;
      const userId = error.response?.data?.userId;

      if (registerError) {
        setError(registerError);
      }
      if (userId) {
        localStorage.setItem("userId", userId);
      }
      if (goToRegister) {
        const directTo = error.response?.data?.step;

        switch (directTo) {
          case "email":
            navigate("/register/verifymail");
            break; // Ensure to break out of the switch case

          case "phone":
            navigate("/register/phone");
            break; // Ensure to break out of the switch case

          case "document":
            navigate("/register/document");
            break; // Ensure to break out of the switch case

          default:
            break; // Handle unexpected values
        }
        return;
      }
    }
  };

  return (
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
        <div className="text-center text-2xl mb-4">Welcome Back</div>
        <div className="flex flex-col gap-4">
          <div className="form-group flex flex-col gap-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email/Username
            </label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              placeholder="Enter your email or username"
              className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-primary focus:outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group flex flex-col gap-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="password"
                value={loginData.password}
                placeholder="Enter your password"
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
          <div className="text-end text-xs text-primary">
            <Link
              to="/forgot-password"
              className="text-[#005E99] font-semibold"
            >
              Forget Password?
            </Link>
          </div>
        </div>
        {error && <p className="text-error text-xs">{error}</p>}
        <div className="mt-6">
          <button
            className="btn btn-prime w-full py-2 px-4 text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center text-xs">
          <div className="divider">or</div>
          <div>
            Don't have an account?{" "}
            <Link to="/register" className="text-[#005E99] font-semibold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
