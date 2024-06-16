import React, { useEffect, useState } from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import image7 from '../assets/image7.jpg';
import image8 from '../assets/image8.jpg';
import image9 from '../assets/image9.jpg';

const images = [image1, image2, image3,image4,image5,image6,image7,image8,image9];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="relative h-screen">
            <div className="flex min-w-full h-screen relative z-0">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={src}
                            alt={`carousel-item-${index}`}
                            className="w-full h-full object-cover"
                            style={{ filter: "brightness(40%)" }}
                        />
                    </div>
                ))}
            </div>
            <button
                className="absolute left-4 border-2 top-2/3 mt-3 transform -translate-y-1/2 text-white px-3 py-2 rounded-full focus:outline-none z-30"
                onClick={prevSlide}
            >
                ❮
            </button>
            <button
                className="absolute right-4 top-2/3 border-2 transform -translate-y-1/2 text-white px-3 py-2 rounded-full focus:outline-none z-30"
                onClick={nextSlide}
            >
                ❯
            </button>
        </div>
    );
};

export default Carousel;
