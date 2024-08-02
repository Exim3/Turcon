import { Link } from "react-router-dom";
import ContactForm from "../../components/contact/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-6">
          <div className=" flex flex-col gap-2">
            <div className="text-3xl ">Contact</div>
            <div className="text-xs">
              <Link to={"/"}> Home / </Link>
              <span className="font-semibold">Contact us</span>
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
            <p className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src="/cphone.svg" alt="" />
              </div>
              <a href="tel:+971564507734">+971564507734</a>
            </p>
            <p className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src="/cphone.svg" alt="" />
              </div>
              <a href="tel:+971564507734">+971564507734</a>
            </p>
            <p className="py-1 px-2 flex gap-2 bg-[#FFD3D3] rounded">
              <div className="flex items-center">
                <img src="/cemail.svg" alt="" />
              </div>
              <a href="mailto:sales@turcon.in">sales@turcon.in</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
