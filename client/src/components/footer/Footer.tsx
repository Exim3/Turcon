import { Link } from "react-router-dom";
import "./style.css";
import { smoothScrollToTop } from "../../utils/SmoothScrollToTop";
import { useEffect, useState } from "react";
import linkedInIcon from "/linkedin.svg";
import faceBookIcon from "/fb.svg";
import InstagramIcon from "/insta.svg";
import twitterIcon from "/twitter.svg";
import whatsappIcon from "/wa.svg";
import scrollUp from "/top.svg";
import Logo from "/logo.svg";
import phoneIcon from "/phone.svg";
import emailIcon from "/email.svg";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="backBg text-white">
        <div className="container mx-auto py-6 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4 justify-center text-center lg:text-start ">
              <div className="w-44 self-center lg:self-start">
                <img src={Logo} alt="turconLogo" />
              </div>
              <div className="address">
                SM - OFFICE - B1 - CENTER F002 OPPOSITE TO AJMAN PORT AND
                CUSTOMS AJMAN UNITED ARAB EMIRATES.
              </div>
              <ul className="p-2 flex flex-col gap-2 self-center lg:self-start">
                <li className="flex gap-3 ">
                  <div>
                    <img src={phoneIcon} alt="phone" />
                  </div>
                  <a
                    href="tel:+971564507734"
                    className="text-white hover:underline"
                  >
                    +971564507734
                  </a>
                </li>
                <li className="flex gap-3">
                  <div>
                    <img src={emailIcon} alt="email" />
                  </div>

                  <a
                    href="mailto:sales@turcon.in"
                    className="text-white hover:underline"
                  >
                    sales@turcon.in
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 justify-center py-4 px-8">
              <h2 className="text-2xl">Quick Links</h2>
              <ul className="flex flex-col gap-4 items-center  text-xl">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/services"}>Our Services</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact Us</Link>{" "}
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:col-span-2 lg:col-span-1 md:mt-3 ">
              <div className="btns flex flex-col gap-3 text-center">
                <h2 className="text-2xl">
                  Register Now for Personalized Container Solutions!
                </h2>
                <div className="text-center">
                  <div className="btn btn-secondbtn me-2">
                    <Link to={"/login"}>Login</Link>
                  </div>
                  <div className="btn btn-prime  border-black">
                    <Link to={"/register"}>Register</Link>
                  </div>
                </div>
              </div>
              <div className="social flex flex-col gap-4">
                <h3 className="text-xl">Follow on Social Media</h3>
                <ul className="flex items-center justify-center gap-3">
                  <li className="">
                    <div className="w-10 h-10 flex justify-center  bg-[#605d5d] rounded-md text-center">
                      <img
                        src={linkedInIcon}
                        alt="linkedIn"
                        className="self-center"
                      />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center  bg-[#605d5d] rounded-md text-center">
                      <img
                        src={twitterIcon}
                        alt="twitter"
                        className="self-center"
                      />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center bg-[#605d5d] rounded-md text-center">
                      <img
                        src={InstagramIcon}
                        alt="instagram"
                        className="self-center"
                      />
                    </div>
                  </li>
                  <li className="">
                    <div className="w-10 h-10 flex justify-center bg-[#605d5d] rounded-md text-center">
                      <img
                        src={faceBookIcon}
                        alt="facebook"
                        className="self-center"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border border-t-1 border-[#e4e4e4] my-6"></div>
          <div className="p-2">
            <p>Copyright © 2024 TURCON MARITIME  All rights reserved.</p>
          </div>
          <div className="fixed bottom-8 right-8 ">
            <a
              className="whats-app"
              href="https://web.whatsapp.com/send?phone=+9585804095&text=Need your support ?"
              target="_blank"
            >
              <img
                src={whatsappIcon}
                alt="whatsapp"
                className="drop-shadow-lg"
              />
            </a>
          </div>
          <div
            className={`fixed ${
              isVisible ? "visible" : "hidden"
            } bottom-8 left-8 bg-white rounded-full p-3 shadow-[0_0_5px_rgb(0,0,0,0.2)] cursor-pointer`}
            onClick={() => smoothScrollToTop(500)}
          >
            <img src={scrollUp} alt="scrollUp" className="drop-shadow-lg w-8" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
