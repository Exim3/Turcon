import "./style.css";
import Carousel from "../../components/carousel/BannerCarousel";
import Testimonal from "../../components/testimonal/Testimonal";
import ContactForm from "../../components/contact/ContactForm";
import ContainerList from "../../components/containerTypes/ContainerList";
import React from "react";
import aboutUs from "/about.png";
import boxIcon1 from "/box1.svg";
import boxIcon2 from "/box2.svg";
import boxIcon3 from "/box3.svg";
import serviceOne from "/container1.png";
import serviceTwo from "/containerAndStorage.png";
import serviceThree from "/container3.png";
import serviceFour from "/container4.png";
import serviceFive from "/container5.png";
import serviceSix from "/container6.png";
import downloadIcon from "/download.svg";
import containerTypeOne from "/containerTypes1.png";
import containerTypeTwo from "/containerTypes2.png";
import containerTypeThree from "/containerTypes3.png";
import containerTypeFour from "/containerTypes4.png";
import { Link, useNavigate } from "react-router-dom";

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
}

const slides: Slide[] = [
  { id: 1, imageUrl: "containerGray.png", title: "Slide 1" },
  { id: 2, imageUrl: "containerBlue.png", title: "Slide 2" },
  { id: 3, imageUrl: "containerRed.png", title: "Slide 3" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* hero */}
      <div className="container mx-auto ">
        <div className="flex flex-col  ">
          <div className="banner  lg:flex  justify-between text-primaryTxt">
            <div className="w-full lg:w-1/2 article flex flex-col gap-4 pt-12 lg:pt-24 ">
              <h2 className="text-xl ">TURCON MARITIME FZE</h2>
              <h1 className="text-2xl font-semibold">
                Elevated Your Operations with Our
                <span className="block">New and Used Container</span>
              </h1>
              <p className="text-md">
                Specialization in new and used containers for sale and lease,
                our solutions cater to global logistics needs with a focus on
                reliability and quality assurance.
              </p>
              <div className="button self-center flex gap-5 ">
                <Link className="btn btn-prime" to={"/buy/inventory"}>
                  Buy Containers
                </Link>
                <Link className="btn btn-secondbtn" to={"/service5"}>
                  Lease Containers
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 col-6">
              <Carousel slides={slides} />
            </div>
          </div>
          <div className="specialization grid md:flex md:flex-wrap items-center justify-center gap-14 font-semibold text-lg pb-6">
            <div className="box  flex gap-4 p-3 rounded-md shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="w-12 h-12 p-3 flex self-center rounded-md bg-[#D7F0FF]">
                <img src={boxIcon1} alt="box" className="self-center" />
              </div>

              <h4 className="basis-3/4">
                New and Used <span className="block"> Container for Sale</span>
              </h4>
            </div>
            <div className="box flex gap-4 p-3 rounded-md shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              <div className="w-12 h-12  p-3 flex self-center rounded-md bg-[#D7F0FF]">
                <img src={boxIcon2} alt="box" className="self-center" />
              </div>

              <h4 className="basis-3/4">
                New and Used{" "}
                <span className="block"> Container for Leasing</span>
              </h4>
            </div>
            <div className="box flex gap-4 p-3 rounded-md shadow-[0_0_4px_rgba(0,0,0,0.25)] ">
              <div className="w-12 h-12 p-3 flex basis-1/5 self-center rounded-md bg-[#D7F0FF]">
                <img src={boxIcon3} alt="box" className="self-center" />
              </div>

              <h4 className="self-center basis-3/4">
                Sales All over the World
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* about */}
      <div className="bg-[#fafafa] mb-6  ">
        <div className="flex flex-col p-4">
          <h2 className="text-center text-4xl  font-semibold mb-8">About Us</h2>
          <div className="about flex items-center flex-wrap md:flex-nowrap md:gap-4  text-center md:text-start container mx-auto justify-center md:justify-between ">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 mb-4 lg:mb-0 ">
              <h3 className="text-2xl  font-semibold ">
                TURCON Was Established In The Ajman , UAE.
              </h3>
              <p className="text-sm">
                We represent the merger of two highly respected,
                service-oriented container sales organizations in the industry
                today. Our combined and complementary product lines ensure that
                our valued customers get the containers they need, in the right
                locations around the world. Our team brings together an
                unparalleled level of specialist knowledge, experience, and
                exemplary customer service, which has been the hallmark of our
                respective companies.
              </p>
              <div className="text-center">
                <div className="btn btn-secondbtn">
                  <Link to={"/about"}>Learn More</Link>
                </div>
              </div>
            </div>
            <div className=" img flex items-center text-center ">
              <img src={aboutUs} alt="aboutUs" className="rounded" />
            </div>
          </div>
        </div>
      </div>
      {/* Our Service */}
      <div className="service container mx-auto mb-6">
        <h2 className="text-center text-4xl  font-semibold mb-8">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          <div
            onClick={() => navigate("/service1")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceOne} alt="Container Inspections" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">Container Inspections</h3>
              <p className="text-sm">
                We offer this container inspection service for both our own
                fleet as well as 3rd party containers.
              </p>
            </div>
            <div className="mt-auto text-readmore">read more</div>
          </div>
          <div
            onClick={() => navigate("/service2")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceTwo} alt="containerAndStorage" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">Container Storage and Repairs</h3>
              <p className="text-sm">
                At this facility we can contract container storage and container
                repairs for external customers such as shipping lines and
                container leasing companies.
              </p>
            </div>
            <div className="mt-auto text-readmore">read more</div>
          </div>
          <div
            onClick={() => navigate("/service3")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceThree} alt="Oneway Movement – Shipping Lines" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">
                Oneway Movement – Shipping Lines
              </h3>
              <p className="text-sm">
                which basically allows you to pick-up a container in location
                “A” and return it in location “B” against a fixed cost amount.
              </p>
            </div>
            <div className="mt-auto text-readmore">read more</div>
          </div>
          <div
            onClick={() => navigate("/service4")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceFour} alt="Maritime containers selling" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">Maritime containers selling</h3>
              <p className="text-sm">
                TURCON sells all sizes of standard containers, but we also stock
                or buy reefers, open top containers, flat racks, hard top
                containers, offshore containers, tank containers etc. 
              </p>
            </div>
            <div className="mt-auto text-readmore">read more</div>
          </div>
          <div
            onClick={() => navigate("/service5")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceFive} alt="Maritime rental of containers" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">Maritime rental of containers</h3>
              <p className="text-sm">
                TURCON operates a fleet of brand new/Used containers exclusively
                reserved for rental.{" "}
              </p>
            </div>
            <div className="mt-auto text-readmore">read more</div>
          </div>
          <div
            onClick={() => navigate("/service6")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4 cursor-pointer"
          >
            <div className="img">
              <img src={serviceSix} alt="worldWideBuisness" />
            </div>
            <div>
              <h3 className="text-2xl pb-3">
                Any container type, for any period, anywhere in the world
              </h3>
              <p className="text-sm">
                TURCON operates from its head office in AJMAN but through our
                reliable international partner network we can deliver the
                containers to any desired geographical location
              </p>
            </div>
            <div className="mt-auto text-readmore ">read more</div>
          </div>
        </div>
      </div>
      {/* agreement */}
      <div className="bg-[#003759] text-white">
        <div className="container mx-auto ">
          <div className=" flex flex-col py-6 text-center gap-6">
            <h2 className="text-3xl lg:text-4xl text-center">
              Download Sales Agreement
            </h2>
            <p className="text-sm lg:text-lg">
              Our sales agreement ensures a transparent and straightforward
              transaction process, guaranteeing the quality and timely delivery
              of containers. For detailed terms and conditions, download our
              agreement below.
            </p>
            <div className=" text-center">
              <a
                href="/docs/SalesAgreement.pdf"
                download
                className="btn btn-second"
              >
                Download <img src={downloadIcon} alt="download" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* container types */}
      <div className="container mx-auto my-6">
        <div className="text-center">
          <h2 className="text-center text-4xl  font-semibold mb-8">
            Containers
          </h2>
          <p className="text-xl">
            We offer a comprehensive selection of containers, including standard
            20-foot and 40-foot units, refrigerated (reefer) containers, and
            specialized containers like flat racks and tank containers.
            Available for both sale and lease, our containers meet diverse
            logistical needs. Enjoy global delivery with exceptional quality and
            reliability.
          </p>
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer"
            onClick={() => navigate("/buy/inventory")}
          >
            <ContainerList
              imgSrc={containerTypeOne}
              altText="Container Types"
              sizes={["40'ft", "40'ft Hc", "20'ft", "45'ft HC", "53'ft HC"]}
              types={["Dry Container", "High Cube Container"]}
              containerName="Standard Container"
            />
            <ContainerList
              imgSrc={containerTypeTwo}
              altText="Container Types"
              sizes={["20'ft", "40'ft ", "45'ft HC", "53'ft HC"]}
              types={[
                "Open Side Container",
                "Double Door Container",
                "Open Top Container",
              ]}
              containerName="Specialized Container"
            />
            <ContainerList
              imgSrc={containerTypeThree}
              altText="Container Types"
              sizes={["T-11", "T 50"]}
              types={["Refridgerator Container"]}
              containerName="Reefers"
            />
            <ContainerList
              imgSrc={containerTypeFour}
              altText="Container Types"
              sizes={["40'ft", "20'ft", "T 11", "T 50"]}
              types={["Gas Tanks", "Heated Tanks", "Swap body Tanks"]}
              containerName="Tanks"
            />
          </div>
          <div className="flex justify-center ">
            <Link className="btn ms-6 btn-prime me-6" to={"/buy/inventory"}>
              Buy Containers
            </Link>
            <a className="btn btn-secondbtn">Lease Containers</a>
          </div>
        </div>
      </div>
      {/* testimonals */}
      <Testimonal />
      <ContactForm />
    </>
  );
};

export default Home;
