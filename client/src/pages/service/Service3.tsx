import React from "react";
import Service from "../../components/services/Service";

const Service3: React.FC = () => {
  return (
    <>
      {" "}
      <div>
        <Service
          title={"Container Inspections"}
          image={"/service3.png"}
          content={
            "Another service in TURCON’s comprehensive service portfolio is our Container Inspection and Survey services. We offer thorough and meticulous container inspection services for both our own fleet and third-party containers. Our highly trained and experienced inspectors use the latest technology and industry standards to assess the condition of containers, ensuring they meet all regulatory and operational requirements. Whether you need routine inspections, pre-purchase surveys, or damage assessments, our team provides detailed reports and recommendations. By choosing TURCON, you ensure the safety, compliance, and efficiency of your container operations."
          }
        />
      </div>
    </>
  );
};

export default Service3;
