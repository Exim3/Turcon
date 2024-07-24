import { Outlet } from "react-router";
import Header from "../../components/header/Header";

const DashBoard = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <div className=" min-h-20 bg-white "></div>

      <Outlet />
    </>
  );
};

export default DashBoard;
