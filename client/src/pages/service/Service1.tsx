import React from "react";
import Service from "../../components/services/Service";

const Service1: React.FC = () => {
  return (
    <>
      <Service
        title={"One way Movement – Shipping Lines"}
        image={"/service1.png"}
        content={
          "Another valuable service in TURCON’s portfolio is our Container Inspection and Survey services. We provide comprehensive inspection services for both our own fleet and third-party containers. Our expert team ensures that every container meets the highest standards of quality and safety, offering peace of mind whether you're managing your own containers or those from other sources. Choose TURCON for reliable and thorough container inspections."
        }
      />
    </>
  );
};

export default Service1;
