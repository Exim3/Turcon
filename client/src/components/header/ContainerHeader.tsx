import { Link } from "react-router-dom";
import InventorySideBar from "../sideBar/InventorySideBar";
import { useAppSelector } from "../../store/store";
import Logo from "/logo.svg";
import cartIcon from "/cart.svg";
import notificationIcon from "/notification.svg";
import profileIcon from "/profile.svg";

const ContainerHeader = () => {
  const login = true;
  const cartvalue = useAppSelector(
    (state) => state.ContainerCounts.TotalCartCount
  );
  console.log(cartvalue, "cart");
  return (
    <>
      <div className="flex bg-base-100 justify-between mx-auto  container min-h-20   ">
        <div className="flex self-center w-full items-center justify-between lg:justify-start lg:w-1/2">
          <div className="logo w-28 md:w-40">
            <Link to={"/"}>
              <img src={Logo} alt="turconLogo" />
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            {!login ? (
              <>
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
              </>
            ) : (
              <div className="hidden xs:flex lg:hidden items-center gap-6">
                <Link
                  to={"/buy/cart"}
                  className=" bg-[#FAFAFA] focus:bg-[#ffd3d3]  hover:bg[#dddddd] p-3 rounded-md text-[#670000] relative"
                >
                  <div className=" text-[#670000] ">
                    <div className="w-6 h-6 rounded-full border  absolute left-full bottom-full -translate-x-4 translate-y-4 font-semibold bg-[#005e99] text-center text-white flex items-center justify-center">
                      <span className="text-xs">
                        {" "}
                        {cartvalue >= 4 ? "3+" : cartvalue}
                      </span>
                    </div>
                    <img src={cartIcon} alt="cart.png" className="h-5 w-5" />
                  </div>
                </Link>

                <Link
                  to={"/buy/notification"}
                  className=" bg-[#FAFAFA] hover:bg-[#dddddd] focus:bg-[#ffd3d3]  p-3 rounded-md"
                >
                  <div>
                    <img
                      src={notificationIcon}
                      alt="notification"
                      className="h-5 w-5"
                    />
                  </div>
                </Link>
              </div>
            )}
            <div className="lg:hidden">
              <InventorySideBar />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex self-center gap-10">
          <ul className="menu menu-horizontal  px-1 text-sm">
            <li>
              <Link
                to={"/buy/inventory"}
                className="navlist  font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary text-black"
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                to={"/buy/orders"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                Order
              </Link>
            </li>
            <li>
              <Link
                to={"/buy/support"}
                className="navlist font-semibold focus:bg-[#ffd3d3] rounded-md focus:text-primary  text-black"
              >
                Support
              </Link>
            </li>
          </ul>
          {login ? (
            <div className="flex items-center gap-6">
              <Link
                to={"/buy/cart"}
                className=" bg-[#FAFAFA] p-3 hover:bg-[#dddddd] focus:bg-[#ffd3d3] rounded-md relative "
              >
                <div className=" text-[#670000] ">
                  <div className="w-6 h-6 rounded-full border  absolute left-full bottom-full -translate-x-4 translate-y-4 font-semibold bg-[#005e99] text-center text-white flex items-center justify-center">
                    <span className="text-xs">
                      {" "}
                      {cartvalue >= 4 ? "3+" : cartvalue}
                    </span>
                  </div>
                  <img src={cartIcon} alt="cart" className="h-5 w-5" />
                </div>
              </Link>
              <Link
                to={"/buy/notification"}
                className=" bg-[#FAFAFA] p-3 hover:bg-[#dddddd] focus:bg-[#ffd3d3]    rounded-md"
              >
                <div>
                  <img
                    src={notificationIcon}
                    alt="notification"
                    className="h-5 w-5"
                  />
                </div>
              </Link>
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
              <a className="btn btn-second border-none">
                <Link to={"/login"}>Login</Link>
              </a>
              <a className="btn ms-6 btn-prime">
                <Link to={"/register"}>Register</Link>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContainerHeader;
