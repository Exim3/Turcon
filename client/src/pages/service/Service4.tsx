import React from "react";
import Service from "../../components/services/Service";
import serviceFour from "/service4.png";

const Service4: React.FC = () => {
  return (
    <>
      <div>
        <Service
          title={"Maritime containers  selling"}
          image={serviceFour}
          content={
            "At TURCON, we pride ourselves on delivering the same high level of professional service and assistance to both regular and one-off customers. Our team is dedicated to helping you make informed decisions about the right type and quality of containers to meet your specific needs and applications. Whether you require containers for long-term projects or short-term use, we provide expert guidance to ensure you choose the most suitable options. We understand that each customer has unique requirements, and we tailor our services to provide personalized solutions. From initial consultation to final delivery, our commitment to excellence ensures that you receive containers that align perfectly with your operational demands."
          }
        />
      </div>
    </>
  );
};

export default Service4;
