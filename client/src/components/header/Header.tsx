import { Link } from "react-router-dom";
import "./style.css";
import SideBar from "../sideBar/SideBar";
import Logo from "/logo.svg";

const Header = () => {
  return (
    <>
      <div className="flex bg-base-100 justify-between mx-auto  container min-h-20  ">
        <div className="flex self-center w-full items-center justify-between lg:justify-start lg:w-1/2">
          <div className="logo w-28 md:w-40">
            <Link to={"/"}>
              <img src={Logo} alt="turconLogo" />
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="lg:hidden">
              <div className="btn btn-secondbtn ">
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
            <div className="ms-2 hidden md:block lg:hidden">
              <div className="btn btn-prime ">
                <Link to={"/register"}>Register</Link>
              </div>
            </div>

            <div className="lg:hidden">
              <SideBar />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex self-center  ">
          <ul className="menu menu-horizontal  px-1 text-sm">
            <li>
              <Link
                to={"/"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                Home
              </Link>
            </li>
            <li className="service relative  ">
              <Link
                to={"/services"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                {" "}
                Our Service
              </Link>

              <ul className="servicelist p-2 text-xs min-w-72 rounded-sm absolute top-full bg-white shadow-inner">
                <li>
                  <Link to={"/service1"}>Oneway Movement - Shipping Lines</Link>
                </li>
                <li>
                  <Link to={"/service2"}>Container Storage and Repairs</Link>
                </li>
                <li>
                  <Link to={"/service3"}>Container Inspections</Link>
                </li>
                <li>
                  <Link to={"/service4"}>Maritime containers selling</Link>
                </li>
                <li>
                  <Link to={"/service5"}>
                    {" "}
                    Maritime rental of containers to shiping lines
                  </Link>
                </li>
                <li>
                  <Link to={"/service6"}>
                    {" "}
                    Any Container Type , for any period , anywhere in the world
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={"/about"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                About
              </Link>
            </li>
            <li className="">
              <Link
                to={"/contact"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="ms-10 self-center">
            <Link to={"/login"} className="btn btn-second border-none">
              Login
            </Link>
            <Link to={"/register"} className="btn ms-6 btn-prime">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
