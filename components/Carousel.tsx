import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselItems = [
  {
    title: "Título 1",
    subtitle: "Subtítulo 1",
    imgSrc: "/path/to/image1.jpg"
  },
  {
    title: "Título 2",
    subtitle: "Subtítulo 2",
    imgSrc: "/path/to/image2.jpg"
  },
  {
    title: "Título 3",
    subtitle: "Subtítulo 3",
    imgSrc: "/path/to/image3.jpg"
  }
];

const CustomCarousel = () => {
  return (
    <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
      {carouselItems.map((item, index) => (
        <div key={index}>
          <img src={item.imgSrc} alt={item.title} />
          <div className="legend">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
