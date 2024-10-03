import React from "react";

const AdminFooter: React.FC = () => {
  return (
    <div className="p-2 text-center text-sm flex items-end justify-center gap-[2px]">
      <span>Copy rights 2024 </span>
      <span className="font-semibold text-sm text-[#221F1F]">
        {" "}
        Turcon .
      </span>{" "}
      Design and Developed By{" "}
      <span className="font-semibold text-sm text-[#0E2087]">
        {" "}
        Turcon maritime FZE Pvt Ltd .{" "}
      </span>{" "}
      <span>All Rights Reserved</span>{" "}
    </div>
  );
};

export default AdminFooter;
