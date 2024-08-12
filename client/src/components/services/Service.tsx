import React from "react";
import CheckIcon from "../svg/Tick";
import { Link } from "react-router-dom";
import bulbIcon from "/bulb.svg";
import safeIcon from "/safe.svg";
import manIcon from "/man.svg";
import serviceMailIcon from "/servicemail.svg";
import servicePhoneIcon from "/servicephone.svg";

type Services = {
  title: string;
  image: string;
  content: string;
};

const Service: React.FC<Services> = ({ title, image, content }) => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center mt-4">
          <div className=" flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A]">{title}</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}>Home / </Link>
              <Link to={"/services"}>services /</Link>
              <span className="font-semibold text-[#0B0A0A]">{title}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="">
            <img src={image} alt="services" />
          </div>
          <div className="flex flex-col gap-6 p-3">
            <h2 className="text-2xl text-[#0B0A0A]">{title}</h2>
            <p className="text-lg text-[#383434]">{content}</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6 p-3 bg-[#D4FFF8]">
            <div className="flex items-center gap-2">
              <div className="">
                <img src={bulbIcon} alt="lightbulb" />
              </div>
              <h4 className="text-3xl text-[#0B0A0A]">Easy & Convenient</h4>
            </div>
            <ul className="list-disc px-8 text-[#383434]">
              <li>
                No need to buy a container and be left with the head-ache to
                find a reliable buyer at your destination Port.
              </li>
              <li>
                You can deliver the container to the shipping line as Shipper
                Owned control as opposed to using a container provided by the
                shipping line. In many cases you will get a SOC reduction on the
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6 p-3 bg-[#D4FFF8]">
            <div className="flex items-center gap-2 ">
              <div className="">
                <img src={safeIcon} alt="safe" />
              </div>
              <h4 className="text-3xl text-[#0B0A0A]">Safe & Secure</h4>
            </div>
            <ul className="list-disc px-8 text-[#383434]">
              <li>No detention charges exposure.</li>
              <li>
                You only need to return the container at the destination port to
                our designated site.
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 text-[#0B0A0A] gap-4">
          <div className="p-4 flex flex-col lg:flex-row gap-8 items-center shadow-[0px_0px_5px_rgb(0,0,0,0.2)] rounded-sm  ">
            <div>
              <img src={manIcon} alt="man" />
            </div>
            <div className="flex flex-col gap-4 text-center lg:text-start">
              <div className="flex flex-col gap-2">
                <p className="text-xl">Contact Our Specialist</p>
                <h5 className="text-2xl text-[#0B0A0A]">Shree</h5>
              </div>
              <div className="grid xs:grid-cols-2 gap-6 justify-center ">
                <div className="flex gap-1 items-center p-2 bg-[#E4E4E4] rounded-md">
                  <div>
                    <img src={serviceMailIcon} alt="mail" />
                  </div>
                  <a href="mailto:sales@turcon.in" className="text-[#008FE8]">
                    sales@turcon.in
                  </a>
                </div>
                <div className="flex gap-1 items-center p-2 bg-[#E4E4E4] rounded-md">
                  <div>
                    <img src={servicePhoneIcon} alt="phone" />
                  </div>
                  <a href="tel:971564507734" className="text-[#008FE8]">
                    971564507734
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-6 flex flex-col justify-center">
            <div>
              <h3 className="text-2xl text-center px-10">
                Explore Our Buying and Leasing for Containers Here.
              </h3>
            </div>
            <div className="flex items-center gap-6 justify-center">
              <div className="btn btn-prime">
                <Link to={"/buy/inventory"}>Buy Container</Link>
              </div>
              <div className="btn btn-secondbtn">Lease Container</div>
            </div>
          </div>
        </div>
        <div className="flex p-4 flex-col gap-4 mb-8 ">
          <div className="flex items-center gap-2 justify-center">
            <div>
              <CheckIcon color="#15B097" size={56} />
            </div>
            <h2 className="text-3xl text-[#0B0A0A] text-center">
              Special Services
            </h2>
          </div>
          <div>
            <p className="text-xl text-center text-[#0B0A0A]">
              The company’s container trading business is experiencing rapid
              growth. Our team of ethical experts is deeply committed to putting
              the customer’s interests first, treating every client’s success as
              their own. They bring a high level of skill and proficiency to
              every stage of the container trading process, ensuring exceptional
              service and seamless transactions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
