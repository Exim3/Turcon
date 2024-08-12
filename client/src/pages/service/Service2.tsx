import React from "react";
import Service from "../../components/services/Service";
import serviceTwo from "/service2.png";

const Service2: React.FC = () => {
  return (
    <>
      <div>
        <Service
          title={"Container Storage and Repairs"}
          image={serviceTwo}
          content={
            "At this facility, we provide comprehensive container storage and repair services for external customers. Our offerings cater to a diverse range of clients, including shipping lines and container leasing companies. With state-of-the-art equipment and a dedicated team of professionals, we ensure that your containers are stored securely and maintained to the highest standards. Our repair services cover everything from minor fixes to major refurbishments, guaranteeing that your containers are always in optimal condition. Partner with us for reliable, efficient, and cost-effective container solutions."
          }
        />
      </div>
    </>
  );
};

export default Service2;
