import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoplay && slides.length > 1) {
      intervalId = setInterval(() => {
        setIndex((state) => (state + 1) % slides.length);
      }, 2000); // Adjust the interval as per your requirement (in milliseconds)
    }

    return () => {
      clearInterval(intervalId); // Cleanup function to clear interval on component unmount or if autoplay is disabled
    };
  }, [autoplay, slides.length]);

  return (
    <div className="carousel-container">
      <div className="slides">
        {transitions((style, i) => (
          <animated.div
            key={i}
            className="slide"
            style={{
              ...style,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <img src={slides[i].imageUrl} alt={slides[i].title} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
