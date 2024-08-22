import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dp from "/profileDp.png";
import editIcon from "/edit.svg";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";

// Define the type for form data
interface UserData {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  companyAddress: string;
  country: string;
  telPhone: string;
}

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    companyAddress: "",
    country: "",
    telPhone: "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { logout, user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/users/", {
        params: { userId },
      });
      console.log(result, "result");
      setUserData(result.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!userData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    // Handle save logic here
    setEditProfile(false);
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Handle password update logic here
    setEditPassword(false);
  };

  const fields = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Mobile Number", name: "phone", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Company Name", name: "companyName", type: "text" },
    { label: "Address", name: "companyAddress", type: "textarea" },
    { label: "Country", name: "country", type: "text" },
    { label: "Tel Phone", name: "telPhone", type: "text" },
  ];

  const LogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white">
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
            <div className="flex flex-col justify-evenly text-[#655F5F] items-end text-xs md:text-sm">
              <div className="flex md:gap-6 w-full justify-between items-center">
                <p className="text-end">Member Since</p>
                <span className="text-[#221F1F] bg-[#FFFFFF] p-1 text-[11px] md:text-sm rounded-xl">
                  11 January 2023
                </span>
              </div>
              <div className="flex md:gap-6 w-full justify-between items-center">
                <p>Last Login</p>
                <span className="text-[#221F1F] bg-[#FFFFFF] p-1 text-[11px] md:text-sm rounded-xl">
                  08 August 2024
                </span>
              </div>
              <div className="flex md:gap-6 w-full justify-between items-center">
                <p>Customer ID:</p>
                <span className="text-[#005E99] text-[11px] md:text-sm">
                  CUS23245450001
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 gap-8 flex flex-col bg-[#fafafa] rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl">Profile Information</h2>
              {!editProfile && (
                <button
                  className="flex items-center gap-2 text-[#005E99] bg-white p-3 rounded-md hover:bg-[#D7F0FF] hover:text-[#005E99] shadow-md"
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
                  {!editProfile ? (
                    field.type === "textarea" ? (
                      <p className="text-[#221F1F]">
                        {userData[field.name as keyof UserData]}
                      </p>
                    ) : (
                      <p className="text-[#221F1F]">
                        {userData[field.name as keyof UserData]}
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

          <div className="p-4 flex flex-col bg-[#fafafa] rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl">Manage Password</h2>
            </div>
            <div className="divider"></div>
            {!editPassword ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="md:flex items-center">
                    <p className="md:min-w-[200px] text-[#655F5F]">Password</p>
                    <p className="text-[#221F1F]">***********</p>
                  </div>
                  <button
                    className="flex items-center gap-2 text-[#005E99] bg-white p-1 md:p-3 rounded-md hover:bg-[#D7F0FF] hover:text-[#005E99] shadow-md"
                    onClick={() => setEditPassword(true)}
                  >
                    <span className="w-6 h-6">
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
                      name="current"
                      type="password"
                      placeholder="Enter Current Password"
                      value={passwordData.current}
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
              <button className="btn btn-second" onClick={LogOut}>
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
