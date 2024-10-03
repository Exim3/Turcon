import React from "react";
import Service from "../../components/services/Service";
import serviceFour from "/service4.png";

const Service4: React.FC = () => {
  return (
    <>
      <div>
        <Service
          title={"Marine containers  selling"}
          image={serviceFour}
          content={
            "At TURCON, we pride ourselves on delivering the same high level of professional service and assistance to both regular and one-off customers. Our team is dedicated to helping you make informed decisions about the right type and quality of containers to meet your specific needs and applications. Whether you require containers for long-term projects or short-term use, we provide expert guidance to ensure you choose the most suitable options. We understand that each customer has unique requirements, and we tailor our services to provide personalized solutions. From initial consultation to final delivery, our commitment to excellence ensures that you receive containers that align perfectly with your operational demands."
          }
          safeContentText={
            "Buying and selling both new and used shipping containers is TURCON’s core business. With our extensive international network and strong relationships with major container leasing companies and container trading firms, TURCON guarantees top-quality containers at the most competitive prices."
          }
          easyContentText={
            "TURCON buys and sells all sizes of standard containers, but we also stock or buy reefers, open top containers, flat racks, hard top containers, offshore containers, tank containers etc. Last, but not least, we can deliver the containers to your designated site, whether that is “just ’round the corner” or at the other end of the world."
          }
        />
      </div>
    </>
  );
};

export default Service4;
