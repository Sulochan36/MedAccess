import React, { useState, useEffect } from "react";
import "./Homepage.css";

const HomePage = () => {
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

  const columnsData = [
    {
      image: "/Images/hospital icon.png",
      title: "Hospitals Around You",
      text: "This is the description for the first column.",
    },
    {
      image: "/Images/doctor icon.png",
      title: "Check Best Doctors",
      text: "This is the description for the second column.",
    },
    {
      image: "/Images/Beds icon.png",
      title: "Search Beds",
      text: "This is the description for the third column.",
    },
    {
      image: "/Images/blood-bank icon.png",
      title: "Need Blood ?",
      text: "This is the description for the fourth column.",
    },
  ];

  return (
    <div>
      {/* Carousel */}
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

      {/* 4-Column Layout */}
      <div className="grid-container">
        {columnsData.map((column, index) => (
          <div className="grid-item" key={index}>
            <img
              src={column.image}
              alt={`Column ${index + 1}`}
              className="column-icon"
            />
            <h3>{column.title}</h3>
            <p>{column.text}</p>
          </div>
        ))}
      </div>

      {/* New Section */}
      <div className="new-container">
        <h2 className="new-heading">Join Us Today</h2>
        <div className="new-subheadings">
          <p>Access the best healthcare facilities near you.</p>
          <p>Find doctors, beds, and blood banks easily.</p>
          <p>Streamline your healthcare journey with us.</p>
          <p>Register now for exclusive benefits!</p>
        </div>
        <div>
        <button className="register-button">Get Registered</button>
        </div>
        <img 
          src="/Images/ForDoctor.png"
          alt="Healthcare Facility"
          className="new-container-image"
        />
      </div>
    </div>
  );
};

export default HomePage;
