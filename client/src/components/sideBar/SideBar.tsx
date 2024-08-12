import React from "react";
import { Link } from "react-router-dom";
import menuIcon from "/menu.svg";
import cancelIcon from "/x.svg";

const SideBar: React.FC = () => {
  const closeDrawer = () => {
    const drawerToggle = document.getElementById(
      "my-drawer-4"
    ) as HTMLInputElement;
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  };

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn hover:bg-[#ffd3d3] focus:bg-primary"
          >
            <img src={menuIcon} alt="hamburger" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
            <li className="drawer-content ">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button ml-auto w-10 h-10 bg-gray-300 shadow flex p-1 justify-center"
              >
                <img src={cancelIcon} alt="cancel" className="w-6 h-6" />
              </label>
            </li>
            <li>
              <Link to="/" onClick={closeDrawer}>
                Home
              </Link>
            </li>
            <li className="mt-1">
              <Link to="/about" onClick={closeDrawer}>
                About
              </Link>
            </li>
            <li className="mt-1">
              <Link to="/services" onClick={closeDrawer}>
                Our Service
              </Link>
            </li>
            <li className="mt-1">
              <Link to="/contact" onClick={closeDrawer}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
