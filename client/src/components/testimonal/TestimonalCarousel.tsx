import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  img: string;
  maxQuoteLength?: number;
};
type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-4 bg-white text-black max-w-72 rounded-lg m-4"
          >
            <div className="head flex gap-4 h-16">
              <div className="flex">
                <img
                  src={`${testimonial.img}`}
                  alt="testimonal"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl">{testimonial.name}</h3>
                <p className="text-sm">{testimonial.location}</p>
              </div>
            </div>
            <div className="content text-sm mt-4 text-[#0B0A0A]">
              {truncateText(
                testimonial.quote,
                testimonial.maxQuoteLength ?? 140
              )}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TestimonialCarousel;
