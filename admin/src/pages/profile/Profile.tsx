import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dp from "/profileDp.png";
import editIcon from "/edit.svg";
import { useAuth } from "../../utils/AuthContext";

import TimeStampDisplay from "../../components/date/TimeStampDisplay";
import { useCountrycode } from "../../utils/useCountryCode";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Model from "../../components/model/Model";

// Define the type for form data
interface UserData {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  companyAddress: string;
  country: string;
  telephone: string;
  createdAt: string; // Add createdAt
  updatedAt: string; // Add updatedAt
}

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   const options: Intl.DateTimeFormatOptions = {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   };
//   return date.toLocaleDateString("en-US", options);
// };

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModel, setIsModel] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    companyAddress: "",
    country: "",
    telephone: "",
    createdAt: "",
    updatedAt: "",
    _id: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { logout, user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  const country = useCountrycode();

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const result = await axiosInstance.get("/api/users/", {
        params: { userId },
      });

      setUserData(result.data);
    } catch (error) {
      console.error(error, "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    const updateUser = async () => {
      try {
        await axiosInstance.put(
          "/api/users/",
          {
            fullName: userData.fullName,
            companyName: userData.companyName,
            companyAddress: userData.companyAddress,
            country: userData.country,
            telephone: userData.telephone,
          },
          {
            params: { userId },
          }
        );
        getUser();
      } catch (error: any) {
        console.error("Error updating user:", error.message);
      }
    };

    // Call the update function
    updateUser();

    // Handle save logic here
    setEditProfile(false);
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(passwordData, "hii");
    try {
      const updatePassword = await axiosInstance.put(
        "/api/users/resetpassword",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );

      const msg = updatePassword.data?.message;
      toast.success(msg);
    } catch (error: any) {
      console.error(error);
      const err = error.response.data?.error;
      if (err) {
        setError(err);
      }
      return;
    }
    setError("");

    setEditPassword(false);
  };

  const fields = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Mobile Number", name: "phone", type: "text", readOnly: true },
    { label: "Email", name: "email", type: "email", readOnly: true },
    { label: "Company Name", name: "companyName", type: "text" },
    { label: "Address", name: "companyAddress", type: "textarea" },
    { label: "Country", name: "country", type: "select" },
    { label: "Tel Phone", name: "telephone", type: "number" },
  ];

  const LogOut = () => {
    logout();
    navigate("/");
  };
  const HandleNo = () => {
    setIsModel(false);
  };
  const HandleYes = () => {
    LogOut();
    setIsModel(false);
  };
  const HandleModel = () => {
    setIsModel(true);
  };

  return (
    <div className="bg-white">
      {isModel && (
        <Model
          yesText={"Logout"}
          noText={"Cancel"}
          onNo={HandleNo}
          onYes={HandleYes}
          primaryText={"Are you sure want to logout ?"}
          subText="You will need to login again to access your account."
        />
      )}

      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-3xl text-[#0B0A0A]">Profile</h1>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to="/">Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">Profile</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-4">
          <div className="px-6 py-8 bg-[#fafafa] flex flex-col md:flex-row gap-4 justify-between rounded-xl shadow-md">
            <div className="flex items-center gap-6 justify-center">
              <div className="w-16 h-16 md:w-32 md:h-32">
                <img src={Dp} alt="Profile Picture" />
              </div>
              <div className="flex flex-col justify-between md:gap-2">
                <h3 className="text-lg md:text-2xl">
                  {userData.fullName || "Name"}
                </h3>
                <h4 className="text-sm md:text-xl">
                  @{userData.email.split("@")[0]}
                </h4>
                <p className="text-xs md:text-sm">
                  {userData.companyName || "Company"}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-evenly text-[#655F5F] items-end text-xs md:text-sm gap-2">
              <div className="flex md:gap-6 w-full justify-between items-center">
                <p className="text-end">Member Since</p>
                <span className="text-[#221F1F] bg-[#FFFFFF] p-1 text-[11px] md:text-sm rounded-xl">
                  {/* {formatDate(userData.createdAt)}  using js date format */}
                  <TimeStampDisplay timestamp={userData.createdAt} />
                </span>
              </div>
              <div className="flex md:gap-6 w-full justify-between items-center">
                <p>Last Login</p>
                <span className="text-[#221F1F] bg-[#FFFFFF] p-1 text-[11px] md:text-sm rounded-xl ">
                  <TimeStampDisplay timestamp={userData.updatedAt} />
                </span>
              </div>
              <div className="flex-col flex md:flex-row md:gap-6 w-full justify-between md:items-center">
                <p>Customer ID:</p>
                <span className="text-[#005E99] text-[11px] md:text-sm">
                  TUR{userData._id.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="p-4 gap-8 flex flex-col bg-[#fafafa] rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl">Profile Information</h2>
              {!editProfile && (
                <button
                  className="flex items-center gap-2 text-[#005E99] bg-white p-3 rounded-md hover:bg-[#D7F0FF] hover:text-[#005E99] shadow-[0px_0px_4px_rgba(0,0,0,0.2)]"
                  onClick={() => setEditProfile((prev) => !prev)}
                >
                  Edit
                  <span className="w-6 h-6">
                    <img src={editIcon} alt="Edit Icon" />
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-col md:gap-3">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-2 w-full md:items-center"
                >
                  <label
                    className="md:min-w-[200px] text-[#655F5F]"
                    htmlFor={field.name}
                  >
                    {field.label}
                  </label>
                  {!editProfile || field.readOnly ? (
                    field.type === "textarea" ? (
                      <p className="text-[#221F1F]">
                        {userData[field.name as keyof UserData] ? (
                          userData[field.name as keyof UserData]
                        ) : (
                          <span className="text-gray-500">none</span>
                        )}
                      </p>
                    ) : field.type === "select" ? (
                      <p className="text-[#221F1F]">
                        {userData[field.name as keyof UserData] ? (
                          userData[field.name as keyof UserData]
                        ) : (
                          <span className="text-gray-500">none</span>
                        )}
                      </p>
                    ) : (
                      <p className="text-[#221F1F]">
                        {userData[field.name as keyof UserData] ? (
                          userData[field.name as keyof UserData]
                        ) : (
                          <span className="text-gray-500">none</span>
                        )}
                      </p>
                    )
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={userData[field.name as keyof UserData]}
                      onChange={handleChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                      rows={4}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={userData[field.name as keyof UserData]}
                      onChange={handleChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    >
                      <option value={userData.country} disabled>
                        {userData.country ? userData.country : "Select Country"}
                      </option>
                      {country.map((country) => (
                        <option key={country.iso} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={userData[field.name as keyof UserData]}
                      onChange={handleChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    />
                  )}
                  <div className="divider my-0"></div>
                </div>
              ))}
              {editProfile && (
                <div className="flex justify-end gap-6 mt-4">
                  <button
                    className="btn bg-[#D7F0FF] text-[#005E99] rounded-md hover:bg-[#D7F0FF] shadow-sm"
                    onClick={() => setEditProfile(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn bg-[#005E99] text-white rounded-md hover:bg-[#005E99] shadow-sm"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Manage Password Section */}
          <div className="p-4 flex flex-col bg-[#fafafa] rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl">Manage Password</h2>
            </div>
            <div className="divider"></div>
            {error && <p>{error}</p>}
            {!editPassword ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="md:flex items-center">
                    <p className="md:min-w-[200px] text-[#655F5F]">Password</p>
                    <p className="text-[#221F1F]">***********</p>
                  </div>
                  <button
                    className="flex items-center gap-2 text-[#005E99] bg-white p-1 md:p-3 rounded-md hover:bg-[#D7F0FF] hover:text-[#005E99] shadow-[0px_0px_4px_rgba(0,0,0,0.2)]"
                    onClick={() => setEditPassword(true)}
                  >
                    <span className="w-6 h-6 ">
                      <img src={editIcon} alt="Edit Password Icon" />
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label
                      htmlFor="current"
                      className="md:min-w-[200px] text-[#655F5F]"
                    >
                      Current Password
                    </label>
                    <input
                      id="current"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter Current Password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label
                      htmlFor="newPassword"
                      className="md:min-w-[200px] text-[#655F5F]"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label
                      htmlFor="confirmPassword"
                      className="md:min-w-[200px] text-[#655F5F]"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter Confirm Password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input input-bordered w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-6 mt-4">
                    <button
                      className="btn bg-[#D7F0FF] text-[#005E99] rounded-md hover:bg-[#D7F0FF] shadow-sm"
                      onClick={() => setEditPassword(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdatePassword}
                      className="btn bg-[#005E99] text-white rounded-md hover:bg-[#005E99] shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-end flex flex-col gap-3">
            <p>Do you wish to log out?</p>
            <div className="flex justify-end">
              <button className="btn btn-second" onClick={HandleModel}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
