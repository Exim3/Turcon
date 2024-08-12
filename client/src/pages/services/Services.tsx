import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import serviceBanner from "/services.jpg";
import serviceOne from "/container1.png";
import serviceTwo from "/containerAndStorage.png";
import serviceThree from "/container3.png";
import serviceFour from "/container4.png";
import serviceFive from "/container5.png";
import serviceSix from "/container6.png";

const Services: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="service container mx-auto mb-6">
        <div className=" flex flex-col gap-2 my-8">
          <div className="text-3xl text-[#0B0A0A] ">Our Services</div>
          <div className="text-xs text-[#7A7474]">
            <Link to={"/"}>Home /</Link>
            <span className="font-semibold text-[#0B0A0A]">Our Service</span>
          </div>
        </div>

        <div>
          <img src={serviceBanner} alt="services" />
        </div>
        <h2 className=" text-2xl  font-semibold my-8">
          Services and Solutions Built Around You
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          <div
            onClick={() => navigate("/service1")}
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
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
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
          >
            <div className="img">
              <img src={serviceTwo} alt="Container Storage and Repairs" />
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
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
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
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
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
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
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
            className="card flex flex-col bg-[#fafafa] border border-[#cfcecec] gap-4 p-4"
          >
            <div className="img">
              <img
                src={serviceSix}
                alt="Any container type, for any period, anywhere in the world"
              />
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
    </>
  );
};

export default Services;
