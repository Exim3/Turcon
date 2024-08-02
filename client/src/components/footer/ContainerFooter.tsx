import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const ContainerFooter: React.FC = () => {
  return (
    <>
      <div className="backBg text-white">
        <div className="container mx-auto py-6 relative">
          <div className="grid lg:grid-cols-2 justify-center items-center ">
            <div className="flex flex-col items-center text-center gap-4 justify-center py-4 px-8">
              <h2 className="text-2xl">Quick Links</h2>
              <ul className="flex  gap-1 w-full items-center justify-center  text-xl flex-wrap">
                <li className="basis-full md:basis-auto md:border-r px-2">
                  <Link to={"/about"}>About</Link>
                </li>{" "}
                <li className="basis-full md:basis-auto md:border-r px-2">
                  <Link to={"/contact"}>Contact Us</Link>
                </li>
                <li className=" basis-full md:basis-auto md:border-r px-2">
                  Terms & Conditions
                </li>
                <li className=" basis-full md:basis-auto md:border-r px-2">
                  Cookie Policy
                </li>
                <li className=" basis-full md:basis-auto px-2">
                  Return Policy
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:col-span-2 lg:col-span-1 md:mt-3 ">
              <div className="social flex flex-col gap-4">
                <h3 className="text-xl">Follow on Social Media</h3>
                <ul className="flex items-center justify-center gap-3">
                  <li className="">
                    <div className="w-10 h-10 flex justify-center  bg-[#605d5d] rounded-md text-center">
                      <img src="/linkedin.svg" alt="" className="self-center" />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center  bg-[#605d5d] rounded-md text-center">
                      <img src="/twitter.svg" alt="" className="self-center" />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center bg-[#605d5d] rounded-md text-center">
                      <img src="/insta.svg" alt="" className="self-center" />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center bg-[#605d5d] rounded-md text-center">
                      <img src="/fb.svg" alt="" className="self-center" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border border-t-1 border-[#e4e4e4] my-6"></div>
          <div className="p-2 text-center">
            <p>Copyright © 2024 TURCON MARITIME  All rights reserved.</p>
          </div>
          <div className="fixed bottom-8 right-8">
            <a
              className="whats-app"
              href="https://web.whatsapp.com/send?phone=+9585804095&text=Need your support ?"
              target="_blank"
            >
              <img src="/wa.svg" alt="" className="drop-shadow-lg" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerFooter;
