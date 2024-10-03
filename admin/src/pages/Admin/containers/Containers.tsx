import React from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import ContainerTable from "../tables/container/ContainerTable";

const Containers: React.FC = () => {
  return (
    <>
      {" "}
      <div className="bg-[#F1F1F1]">
        <AdminHeader title={"Containers"} />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6">
        <div className="w-full bg-white rounded-xl shadow-[0px_0px_12px_rgba(0,0,0,0.2)]">
          <ContainerTable />
        </div>
      </div>
    </>
  );
};

export default Containers;
