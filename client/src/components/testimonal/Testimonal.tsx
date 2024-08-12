import TestimonalCarousel from "./TestimonalCarousel";
import Testimonal1 from "/testimonal1.png";
import "./style.css";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  img: string;
  maxQuoteLength?: number;
};

const testimonialsData: Testimonial[] = [
  {
    name: "John Anderson",
    location: "Sydney, Australia",
    quote:
      "I was hesitant about buying a container without seeing it in person, but the detailed descriptions and photos on the website reassured me I was hesitant about buying a container without seeing it in person, but the detailed descriptions and photos on the website reassured me.",
    img: Testimonal1,
    maxQuoteLength: 150,
  },
  {
    name: "John Anderson",
    location: "Sydney, Australia",
    quote:
      "I was hesitant about buying a container without seeing it in person, but the detailed descriptions and photos on the website reassured me.",
    img: Testimonal1,
  },
  {
    name: "John Anderson",
    location: "Sydney, Australia",
    quote:
      "I was hesitant about buying a container without seeing it in person, but the detailed descriptions and photos on the website reassured me.",
    img: Testimonal1,
  },
];
const Testimonal = () => {
  return (
    <>
      <div className="background text-white flex flex-col justify-center ">
        <div className="container mx-auto flex flex-col gap-4 text-center text-white my-4 py-4 relative">
          <h3 className="text-4xl">Testimonials</h3>
          <h4 className="text-2xl">
            What Our Customers Are Saying About Their Container Purchases
          </h4>
        </div>
        <div className="w-11/12 mx-auto z-10 container">
          <TestimonalCarousel testimonials={testimonialsData} />
        </div>
      </div>
    </>
  );
};

export default Testimonal;
