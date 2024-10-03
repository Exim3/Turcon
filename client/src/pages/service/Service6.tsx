import React from "react";
import Service from "../../components/services/Service";
import serviceSix from "/service6.png";

const Service6: React.FC = () => {
  return (
    <>
      <div>
        <Service
          title={"Any container type, for any period, anywhere in the world"}
          image={serviceSix}
          content={
            "TURCON, headquartered in AJMAN UAE, extends its services globally through a dependable network of international partners, ensuring the delivery of containers to any specified location worldwide. We offer flexible leasing options, including one-way leases, as well as both short and long-term container rentals."
          }
          safeContentText={
            "Rest easy knowing that no matter the container type, duration, or location, we prioritize your security. Our containers meet the highest industry standards, ensuring safe transport and storage. With our trusted global network, your cargo is protected every step of the way – anytime, anywhere."
          }
          easyContentText={
            "No matter the container type, duration, or location, we’ve got you covered. Whether you need a short-term or long-term solution, anywhere in the world, our global network ensures fast and hassle-free service. With just a few clicks, secure the right container at the best price – anytime, anywhere."
          }
        />
      </div>
    </>
  );
};

export default Service6;
