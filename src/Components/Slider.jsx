import React, { useState, useEffect } from "react";

const Carousel = ({ images, imageWidth, imageHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="carousel">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{ width: imageWidth, height: imageHeight }}
      />
    </div>
  );
};

const AutoCarousel = () => {
  const carouselImages = [
    "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/534/1630534-i-bea5894553aa",
    "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5212/1545212-i-163a4ee38593",
    "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5944/1615944-i-d9f07bfd2d40",
    "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/572/1590572-i-2a38a714377b",
  ];

  const imageWidth = "100%"; // Set your desired width
  const imageHeight = "400px";
  const imageBorderRadius = "10px";

  return (
    <div>
      <Carousel
        images={carouselImages}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        imageBorderRadius={imageBorderRadius}
      />
    </div>
  );
};

export default AutoCarousel;
