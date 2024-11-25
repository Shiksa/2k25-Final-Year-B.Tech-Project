import React from 'react';
import Slider from 'react-slick';
import styles from './HeroTabSection.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const images = [
  '/img1.jpeg',
  '/img2.jpeg',
  '/img3.jpeg'
];

const HeroTabSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.root}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className={styles.slide}>
            <img src={img} alt={`Slide ${index + 1}`} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroTabSection;
