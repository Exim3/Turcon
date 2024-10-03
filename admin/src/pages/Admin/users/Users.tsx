import React from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import UserTable from "../tables/user/UserTable";

const Users: React.FC = () => {
  return (
    <>
      {" "}
      <div className="bg-[#F1F1F1]">
        <AdminHeader title={"Users"} />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6 ">
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <div>
            <UserTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
