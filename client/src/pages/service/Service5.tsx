import React from "react";
import Service from "../../components/services/Service";
import serviceFive from "/service5.png";

const Service5: React.FC = () => {
  return (
    <>
      {" "}
      <div>
        <Service
          title={"Marine rental of containers"}
          image={serviceFive}
          content={
            "At TURCON, we pride ourselves on delivering the same high level of professional service and assistance to both regular and one-off customers. Our team is dedicated to helping you make informed decisions about the right type and quality of containers to meet your specific needs and applications. Whether you require containers for long-term projects or short-term use, we provide expert guidance to ensure you choose the most suitable options. We understand that each customer has unique requirements, and we tailor our services to provide personalized solutions. From initial consultation to final delivery, our commitment to excellence ensures that you receive containers that align perfectly with your operational demands."
          }
          safeContentText={
            "Rental periods can be short or long term and may vary from a minimum of 1 month to any desired length of time.The longer the time commitment,  the lower the daily rental rate."
          }
          easyContentText={
            "People moving to a new home and needing temporary storage for their furniture and other belongings. Warehouses  covering peak periods with the rental of containers to address a temporary storage capacity proble. Supermarkets  and cold storage warehouses  needing temporary surplus cold storage capacity through the rental of reefer containers."
          }
        />
      </div>
    </>
  );
};

export default Service5;
