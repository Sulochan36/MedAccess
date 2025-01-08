import React, { useState, useEffect } from "react";
import "./Carousal.css"; // We'll need a separate CSS file for carousel styles

const Carousel = () => {
    const carouselImages = [
        "/Images/Slide1.png",
        "/Images/Slide2.png",
        "/Images/Slide3.png",
        "/Images/Slide4.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
        );
    };

    return (
        <div className="carousel-container">
            <button className="carousel-button prev" onClick={prevSlide}>
                ❮
            </button>
            <div className="carousel-slide">
                <div
                    className="carousel-images"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {carouselImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="carousel-image"
                        />
                    ))}
                </div>
            </div>
            <button className="carousel-button next" onClick={nextSlide}>
                ❯
            </button>
        </div>
    );
};

export default Carousel;
