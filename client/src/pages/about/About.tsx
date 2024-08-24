import React from "react";
import AboutBox, { AboutBoxInvert } from "../../components/about/AboutBox";
import { Link } from "react-router-dom";
import flight from "/flight.png";
import flight2 from "/flight2.png";
import flight3 from "/flight3.png";
import aboutHero from "/abouthero.png";

const About: React.FC = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center mt-4">
          <div className=" flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A] ">About</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}>Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">About</span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6  ">
          <div className="flex flex-col gap-8 p-6 bg-[#FAFAFA] rounded-md">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl text-[#9A0000]">Who we are</h2>
              <h1 className="text-3xl font-semibold">
                "Turcon: Providing Containers for All Your Needs Worldwide"
              </h1>
            </div>
            <p className="text-[16px]">
              We represents the merger of two of the most respected,
              service-oriented container sales organizations in the industry
              today. The combined and complimentary product lines offer our
              valued customers the products they need in the right locations
              around the world. The combination of our people offers an
              unprecedented level of specialist knowledge, experience and
              exemplary customer service that has been the hallmark of our
              respective companies.
            </p>
          </div>
          <div
            className="lg:bg-cover bg-center mx-auto lg:mx-0"
            style={{ backgroundImage: `url(${aboutHero})` }}
          >
            <img src={aboutHero} alt="" className="lg:hidden object-fill " />
          </div>
        </div>

        <div className="divider my-0"></div>

        <div className="flex flex-wrap justify-center gap-20">
          <div className="flex gap-6 px-4 py-3 items-center text-center">
            <div>
              <img src="/aboutteam.svg" alt="" />
            </div>
            <div className="flex-col flex gap-2">
              <p className="text-3xl font-bold text-[#003759]">380</p>
              <p className="text-2xl">Team Members</p>
            </div>
          </div>

          <div className="flex gap-6 px-4 py-3 items-center text-center">
            <div>
              <img src="/aboutheart.svg" alt="" />
            </div>
            <div className="flex-col flex gap-2">
              <p className="text-3xl font-bold text-[#003759]">06</p>
              <p className="text-2xl">Services</p>
            </div>
          </div>

          <div className="flex gap-6 px-4 py-3 items-center text-center">
            <div>
              <img src="/aboutclient.svg" alt="" />
            </div>
            <div className="flex-col flex gap-2">
              <p className="text-3xl font-bold text-[#003759]">100+</p>
              <p className="text-2xl">Clients</p>
            </div>
          </div>
        </div>

        <AboutBox
          title={"Meeting Customer Needs"}
          topTitle={"Our Vision"}
          content={
            "Our Competitive Edge Our intention is to achieve what multinational companies cannot; to meet the Critical Success Factors of customers."
          }
          imageUrl={flight}
        />
        <AboutBoxInvert
          title={"Customer-Centric Excellence"}
          topTitle={"Our Mission"}
          content={
            "Our Commitment To provide superior service through clear, concise two-way communication. The goal is to build relationships through our flexibility to meet our customer's changing needs."
          }
          imageUrl={flight2}
        />
        <AboutBox
          title={"Unparalleled Expertise"}
          topTitle={"Why Choose Us?"}
          content={
            "The Turcon Advantage Turcon is integrated by a team of Experienced People who believe in providing prompt and effective services to customers, which is beyond compare."
          }
          imageUrl={flight3}
        />
      </div>
      <div className="bg-[#c5e8fd]">
        <div className="lg:mx-12 py-3 flex flex-col gap-6 ">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl text-[#9A0000]">Careers</h3>
            <h2 className="text-[45px] font-semibold">
              Interested In Join Our Team?
            </h2>
            <div>
              <p className="text-2xl">
                Drop us a mail to
                <span className="text-[#005E99]">
                  <a href="mailto:career@turcon.in"> career@turcon.in</a>
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid md:grid-cols-2 items-center gap-4">
              <div className="form-group flex flex-col gap-3 ">
                <label htmlFor="" className="block w-full  mx-auto">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter the First Name"
                  className="input input-bordered w-full  mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full  mx-auto">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter the Email"
                  className="input input-bordered w-full  mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full mx-auto">
                  PhoneNumber
                </label>
                <input
                  type="phone"
                  placeholder="Enter the PhoneNumber"
                  className="input input-bordered w-full  mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:border-[#11A3FF] ring-0 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col gap-3">
                <label htmlFor="" className="block w-full  mx-auto">
                  Department
                </label>

                <select className="select w-full mx-auto placeholder:text-xs border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:border-[#11A3FF] ring-0 focus:outline-none">
                  <option defaultValue={""}>Select Department</option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Enquiry</option>
                </select>
              </div>
            </div>
            <div className="form-group flex flex-col gap-3 mt-3 self-start w-full mx-auto max-w-sm md:max-w-none ">
              <label htmlFor="" className="block w-full ">
                Message
              </label>
              <textarea
                className="textarea textarea-info rounded-sm  w-full mx-auto max-w-md md:max-w-none  border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="text-center mt-4">
              <div className="btn text-white rounded bg-[#005e99] hover:bg-[#008fe8] focus:bg-[#004a79] active:bg-[#004a79]">
                Send Message
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
