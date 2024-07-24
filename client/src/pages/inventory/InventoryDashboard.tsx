import { Outlet } from "react-router";
import ContainerHeader from "../../components/header/ContainerHeader";

const InventoryDashboard = () => {
  return (
    <>
      <div className="shadow-[0_0px_4px_0px_rgba(0,0,0,0.25)] top-0 left-0 right-0 z-50 fixed">
        <ContainerHeader />
      </div>
      <div className="min-h-20"></div>
      <Outlet />
    </>
  );
};

export default InventoryDashboard;
