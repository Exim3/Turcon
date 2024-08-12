import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import supportIcon from "/support1.svg";

const Support: React.FC = () => {
  return (
    <>
      <div className="bg-my-gradient">
        <div className="container mx-auto flex flex-col gap-8 ">
          <div className="flex justify-between items-center mt-4">
            <div className=" flex flex-col gap-2">
              <div className="text-xl md:text-3xl text-[#0B0A0A] ">Support</div>
              <div className="text-[10px] md:text-sm text-[#7A7474]">
                <Link to={"/"}>Home / </Link>
                <span className="font-semibold text-[#0B0A0A]">Support </span>
              </div>
            </div>
          </div>

          <section className="flex flex-col gap-4 text-sm md:text-xl text-center">
            <h2 className="text-xl font-semibold md:text-3xl ">
              Frequently Asked Questions{" "}
            </h2>
            <p>These are the most frequently asked questions on our platform</p>
          </section>
          <main className="flex flex-col gap-8">
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                How to Buy Shipping Containers?
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                Once you register on our platform, you gain immediate access to
                buy new and used containers from Turcon. Our streamlined
                registration process ensures that customers can effortlessly
                browse, select, and purchase the container they need. Simply
                register, choose your desired container, select your preferred
                payment method, and send a booking request. Our sales team will
                then contact you to finalize the details.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                Where to Buy Containers?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                Buy containers easily at Turcon! Simply register on our
                platform, browse our selection of new and used containers,
                choose your container, and select a payment method. After
                sending a booking request, our sales team will contact you to
                finalize the purchase. Enjoy a smooth and hassle-free buying
                experience with Turcon.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                What Types of Containers are Available?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                In Turcon, we have several container types including: Standard
                Dry Container, Refrigerated Container (Reefer), Open Top
                Container, Flat Rack Container, High Cube Container, Tank
                Container, and ISO Tank Container.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                What are the different conditions available for maritime
                containers?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                In maritime containers, we list several conditions such as New,
                IICL, ASIS, Cargo-worthy, Scrap, Damage, WWT, and Enance.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                How to Make Payment?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                When you make a booking request with Turcon, you need to choose
                your payment type: either credit / debit card or bank transfer.
                Once your request is received by our team, they will contact you
                to finalize the booking. Afterward, they will provide you with
                the bank details if you chose bank transfer, or guide you
                through the payment process if you selected card payment.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3  bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                How many free storage days do you offer, and what happens if the
                order is not picked up within that period?
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                We offer 5 free storage days. Please confirm that you are aware
                of this policy. Note that if orders are not picked up within
                this time frame, they may be canceled, and storage fees could
                apply.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                What is the purpose of container shipping?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                Container shipping aims to make transporting goods over long
                distances more efficient and cost-effective. It uses
                standardized containers to simplify loading and unloading, speed
                up shipping, reduce damage, and enhance security. This method
                supports global trade by connecting markets around the world and
                allows for economies of scale.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                What should I do if I can't find the container I am looking for?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                If you can't find the container you're looking for, please
                contact our customer service team. We can help you locate the
                right container or offer alternative solutions that meet your
                needs. Additionally, we provide notifications when we restock
                containers, so you’ll be informed as soon as your desired
                container becomes available.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                What types of containers are available on your platform?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                On our platform, we offer a wide range of containers in various
                sizes, conditions, and types. Simply visit our inventory to find
                and purchase the container that best suits your business needs.
              </p>
            </details>
            <details className="focus:bg-none active:bg-none shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md">
              <summary className="p-3 bg-none focus:bg-none active:bg-none text-lg lg:text-xl flex items-center gap-4">
                <div className="p-4 border rounded-md bg-[#FFD3D3]">
                  <img src={supportIcon} alt="support" />
                </div>{" "}
                How do I choose the right container for my needs?{" "}
              </summary>
              <p className="p-3 px-6 text-sm lg:text-lg">
                To select the right container, consider factors such as the type
                of cargo, required size, and specific features. Our team is
                available to assist you in making the best choice based on your
                requirements.
              </p>
            </details>
          </main>

          <section className="flex items-center  mx-auto gap-10 mb-6">
            <div>
              <h3 className=" text-xl lg:text-2xl font-semibold">
                Still have questions?
              </h3>
              <p className="text-sm md:text-xl ">
                Can't find the answer you're looking for? Please contact our
                support team.
              </p>
            </div>
            <div></div>
            <div className="btn btn-prime">
              <Link to={"/contact"}>Contact</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Support;
