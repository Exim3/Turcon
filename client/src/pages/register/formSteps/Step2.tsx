import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store";
import axiosInstance from "../../../utils/axiosInstance";

export const Step2 = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [resendStartTime, setResendStartTime] = useState<number | null>(null);
  const userId = localStorage.getItem("userId") || "";
  const registerUser = useAppSelector((state) => state.RegisterUser);
  const userString = localStorage.getItem("user");
  let user: { email?: string } | null = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const handleResend = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/api/auth/signup/resentmail", {
        userId,
      });
      const msg = response.data?.message;
      if (msg) setSuccess(msg);
      // Start the timer
      setIsResendDisabled(true);
      setResendStartTime(Date.now());
    } catch (error) {
      console.error("Error resending email:", error);
      setError("Failed to resend verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResendDisabled && resendStartTime) {
      interval = setInterval(() => {
        const elapsedTime = Date.now() - resendStartTime;
        const remainingTime = Math.max(0, 30 * 1000 - elapsedTime);
        setResendTimer(remainingTime);

        if (remainingTime === 0) {
          clearInterval(interval);
          setIsResendDisabled(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled, resendStartTime]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewEmail(registerUser.email || user?.email || "");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      setError("Email cannot be empty.");
      return;
    }

    try {
      setIsEditing(true);

      const response = await axiosInstance.put("/api/auth/signup/updatemail", {
        userId,
        newEmail,
      });

      const msg = response.data?.message;
      if (msg) setSuccess(msg);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, email: newEmail })
      );
    } catch (error) {
      console.error("Error updating email:", error);
      setError("Failed to update email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format remaining time in MM:SS
  const formatTime = (timeMs: number) => {
    const seconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    return `${minutes}:${displaySeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="body flex flex-col gap-4 text-center">
      <div className="text-2xl font-semibold">Check Your Email</div>
      <div className="text-sm text-center max-w-sm mx-auto text-[#383434]">
        To start using Turcon, please confirm your email address with the email
        we sent to{" "}
      </div>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={handleInputChange}
            className="input input-bordered w-full placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none rounded"
            placeholder="Enter new email"
          />
          <button className="btn btn-prime" onClick={handleUpdateEmail}>
            Update Email
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          Registered Email: {registerUser.email || user?.email}
          <span
            className="text-[#9A0000] cursor-pointer"
            onClick={handleEditClick}
          >
            {" "}
            Edit
          </span>
        </p>
      )}
      {error && <p className="text-error text-xs">{error}</p>}
      {success && <p className="text-success text-xs">{success}</p>}
      <button
        className={`font-semibold text-primary ${
          isResendDisabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleResend}
        disabled={isResendDisabled || isLoading}
      >
        {isLoading ? (
          <span className="loading loading-bars loading-sm  bg-primary"></span>
        ) : (
          "Resend"
        )}
        {isResendDisabled && (
          <span className="text-red-600">
            {""}
            {formatTime(resendTimer)}{" "}
          </span>
        )}
      </button>
    </div>
  );
};
