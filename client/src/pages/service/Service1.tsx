import React from "react";
import Service from "../../components/services/Service";
import serviceOne from "/service1.png";

const Service1: React.FC = () => {
  return (
    <>
      <Service
        title={"One way Movement – Shipping Lines"}
        image={serviceOne}
        content={
          "TURCON also offers the one-way rental option, which basically allows you to pick-up a container in location “A” and return it in location “B” against a fixed cost amount."
        }
        safeContentText={
          "No detention charges exposure. You only need to return the container at the destination port to our designated site."
        }
        easyContentText={
          "You can deliver the container to the shipping line as Shipper-Owned (SOC) instead of using a container provided by the shipping line. In many cases, you will get an SOC reduction on the shipping costs."
        }
      />
    </>
  );
};

export default Service1;
