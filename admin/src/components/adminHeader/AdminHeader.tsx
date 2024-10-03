import React, { useEffect, useState } from "react";
import { BellIcon, ChatIcon } from "../svg/Tick";
import profile from "/adminImg.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

type HeaderProps = {
  title: string;
  breadCrums?: string;
  breadlinks?: string;
};

const AdminHeader: React.FC<HeaderProps> = ({
  title,
  breadCrums,
  breadlinks,
}) => {
  const [adminUser, setAdminUser] = useState({
    email: "",
    fullName: "",
    phone: "",
    role: "",
  });
  const { user } = useAuth();

  const userId: string = user?.id || "";

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get", {
        params: { userId },
      });
      setAdminUser(response.data?.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <div className="px-8 py-3  bg-white flex items-center justify-between  shadow-[0px_0px_8px_rgba(0,0,0,0.2)]">
        <div>
          <h3 className="text-sm text-[#4E4949]">
            <Link to={"/"}>Home</Link> /{" "}
            <span className="text-[#221F1F]">
              <Link to={breadlinks ? `/${breadlinks}` : ""}>
                {" "}
                {breadCrums ? breadCrums : title}
              </Link>
            </span>
          </h3>
          <h2 className="text-3xl text-semibold">{title}</h2>
        </div>
        <div className="gap-8 flex items-center">
          <div className="p-3 shadow-[0px_0px_4px_rgba(0,0,0,0.2)] rounded-xl ">
            <ChatIcon color="#9a0000" />
          </div>
          <div className="p-3 shadow-[0px_0px_4px_rgba(0,0,0,0.2)] rounded-xl ">
            <BellIcon color="#9a0000" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <img src={profile} alt="" className="w-12 h-12" />
            </div>
            <div>
              <h3 className="font-semibold">
                {adminUser?.fullName || "Support"}
              </h3>
              <p className="text-[#4E4949] capitalize">
                {adminUser?.role === "superadmin"
                  ? "Super Admin"
                  : adminUser?.role || "support"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
