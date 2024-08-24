import { Link } from "react-router-dom";
import ContactForm from "../../components/contact/ContactForm";
import phoneIcon from "/cphone.svg";
import emailIcon from "/cemail.svg";

const Contact = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-6">
          <div className=" flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A]">Contact</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}> Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">Contact us</span>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
      <div className="container mx-auto">
        <div className="py-8 gap-8 flex-col flex">
          <p className="text-2xl text-center">
            Looking to sell your container? Our sales executives are here to
            help you get the best price. Contact us today!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src={phoneIcon} alt="phone" />
              </div>
              <a href="tel:+971564507734">+971564507734</a>
            </div>
            <div className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src={phoneIcon} alt="phone" />
              </div>
              <a href="tel:+971564507734">+971564507734</a>
            </div>
            <div className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src={emailIcon} alt="email" />
              </div>
              <a href="mailto:sales@turcon.in">sales@turcon.in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
