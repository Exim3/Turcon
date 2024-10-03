import React from "react";
import Service from "../../components/services/Service";
import serviceThree from "/service3.png";

const Service3: React.FC = () => {
  return (
    <>
      {" "}
      <div>
        <Service
          title={"Container Inspections"}
          image={serviceThree}
          content={
            "Another service in TURCON’s comprehensive service portfolio is our Container Inspection and Survey services. We offer thorough and meticulous container inspection services for both our own fleet and third-party containers. Our highly trained and experienced inspectors use the latest technology and industry standards to assess the condition of containers, ensuring they meet all regulatory and operational requirements. Whether you need routine inspections, pre-purchase surveys, or damage assessments, our team provides detailed reports and recommendations. By choosing TURCON, you ensure the safety, compliance, and efficiency of your container operations."
          }
          safeContentText={
            "All inspections we arrange for you are carried out by reliable external partners in order to avoid conflicting interests. If you want to make sure the containers you buy from us (or even from a third party) are in a perfect condition, we can arrange the appropriate container inspection for you.The partners we use for all container inspections use qualified IICL inspectors for all inspections."
          }
          easyContentText={
            "All containers we sell or rent have been thoroughly examined by our own staff, according to the sales or rental standard that is required for each specific booking .If for any reason you would want an objective second opinion, TURCON can cater to your needs."
          }
        />
      </div>
    </>
  );
};

export default Service3;
