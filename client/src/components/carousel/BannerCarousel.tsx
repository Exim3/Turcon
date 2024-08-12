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

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    intervalId = setInterval(() => {
      setIndex((state) => (state + 1) % slides.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [slides.length]);

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
