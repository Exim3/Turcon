import { Link } from "react-router-dom";

const ContainerHeader = () => {
  return (
    <>
      <div className="flex bg-base-100 justify-between mx-auto  container min-h-20   ">
        <div className="flex self-center w-full items-center justify-between lg:justify-start lg:w-1/2">
          <div className="logo w-28 md:w-40">
            <Link to={"/"}>
              <img src="/public/logo.svg" alt="" />
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="lg:hidden">
              <div className="btn btn-secondbtn ">Login</div>
            </div>
            <div className="ms-2 hidden md:block lg:hidden">
              <div className="btn btn-prime ">Register</div>
            </div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden bg-[#ffd3d3]"
              >
                <img src="menu.svg" alt="" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Inventory</a>
                </li>
                <li>
                  <a>Order</a>
                </li>
                <li>
                  <a>support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex self-center">
          <ul className="menu menu-horizontal  px-1 text-sm">
            <li>
              <Link to={"/"} className="navlist font-semibold focus:bg-white">
                Inventory
              </Link>
            </li>
            <li>
              <Link to={"/"} className="navlist font-semibold focus:bg-white">
                Order
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="navlist  font-semibold focus:bg-white"
              >
                Support
              </Link>
            </li>
            <li className="">
              <Link
                to={"/contact"}
                className="navlist  font-semibold focus:bg-white"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="ms-10 self-center">
            <a className="btn btn-second border-none">Login</a>
            <a className="btn ms-6 btn-prime">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerHeader;
