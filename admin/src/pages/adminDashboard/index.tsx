import { Outlet } from "react-router";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import AdminFooter from "../../components/adminFooter/AdminFooter";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex w-full h-full">
      <div className="fixed top-0 left-0 w-[22%] h-full bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.2)] overflow-y-auto p-6 z-40">
        <AdminSidebar />
      </div>
      <div className="w-[22%] border border-red-600"></div>
      <div className=" w-[78%] h-full">
        <Outlet />
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;
