import React from "react";
import Service from "../../components/services/Service";

const Service6: React.FC = () => {
  return (
    <>
      <div>
        <Service
          title={"Any container type, for any period, anywhere in the world"}
          image={"/service6.png"}
          content={
            "TURCON, headquartered in AJMAN, extends its services globally through a dependable network of international partners, ensuring the delivery of containers to any specified location worldwide. We offer flexible leasing options, including one-way leases, as well as both short and long-term container rentals."
          }
        />
      </div>
    </>
  );
};

export default Service6;
