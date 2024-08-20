import { Outlet } from "react-router";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex bg-[#E4E4E4] h-full">
      <div className="fixed top-0 left-0 w-[22%] h-full bg-white border-r overflow-y-auto">
        <AdminSidebar />
      </div>
      <div className="flex-grow ml-[22%] p-4 h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
