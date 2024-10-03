import { Link, NavLink } from "react-router-dom";
import "./style.css";
import SideBar from "../sideBar/SideBar";
import Logo from "/logo.svg";
import { useAuth } from "../../utils/AuthContext";
import profileIcon from "/profile.svg";

const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="flex bg-base-100 justify-between mx-auto  container min-h-20  ">
        <div className="flex self-center w-full items-center justify-between lg:justify-start lg:w-1/2">
          <div className="logo w-28 md:w-40">
            <Link to={"/"}>
              <img src={Logo} alt="turconLogo" />
            </Link>
          </div>
          {!user && (
            <div className="flex gap-4">
              <div className="lg:hidden">
                <Link to={"/login"} className="btn btn-secondbtn">
                  Login
                </Link>
              </div>
              <div className="ms-2 hidden md:block lg:hidden">
                <Link to={"/register"} className="btn btn-prime ">
                  Register
                </Link>
              </div>

              <div className="lg:hidden">
                <SideBar />
              </div>
            </div>
          )}
        </div>
        <div className="navbar-center hidden lg:flex self-center  ">
          <ul className="menu menu-horizontal  px-1 text-sm">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `navlist font-semibold rounded-md ${
                    isActive ? "bg-[#ffd3d3] text-primary " : "text-black"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="service relative  ">
              <NavLink
                to={"/services"}
                className={({ isActive }) =>
                  `navlist font-semibold rounded-md ${
                    isActive ? "bg-[#ffd3d3] text-primary " : "text-black"
                  }`
                }
              >
                {" "}
                Our Service
              </NavLink>

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
                  <Link to={"/service4"}>Marine containers selling</Link>
                </li>
                <li>
                  <Link to={"/service5"}>
                    {" "}
                    Marine rental of containers to shiping lines
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
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `navlist font-semibold rounded-md ${
                    isActive ? "bg-[#ffd3d3] text-primary " : "text-black"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `navlist font-semibold rounded-md ${
                    isActive ? "bg-[#ffd3d3] text-primary " : "text-black"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                to={"/buy/profile"}
                className=" bg-[#FAFAFA] p-3 hover:bg-[#dddddd] focus:bg-[#ffd3d3]   rounded-md"
              >
                <div>
                  <img src={profileIcon} alt="profile" className="h-5 w-5" />
                </div>
              </Link>
            </div>
          ) : (
            <div className="ms-10 self-center">
              <Link to={"/login"} className="btn btn-second border-none">
                Login
              </Link>
              <Link to={"/register"} className="btn ms-6 btn-prime">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
