import { Outlet } from "react-router";
import ContainerHeader from "../../components/header/ContainerHeader";
import ContainerFooter from "../../components/footer/ContainerFooter";

const InventoryDashboard = () => {
  return (
    <>
      <div className="shadow-[0_0px_4px_0px_rgba(0,0,0,0.25)] top-0 left-0 right-0 z-50 fixed bg-white">
        <ContainerHeader />
      </div>
      <div className="min-h-20"></div>
      <div>
        <Outlet />
      </div>
      <div>
        <ContainerFooter />
      </div>
    </>
  );
};

export default InventoryDashboard;
