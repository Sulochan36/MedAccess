import React, { useState, useEffect } from "react";
import "./Homepage.css";
import BlogsNews from "./BlogsNews";

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
        <>
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
                    <h2 className="new-heading">Join Us Today (For Solo Practitioner)</h2>
                    <div className="new-subheadings">
                        <p className="subtitle">Find doctors, beds, and blood banks easily. <br></br>Register now for exclusive benefits!<br></br>Streamline your healthcare journey with us<br></br>Register now for exclusive benefits!</p>
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
            <div>
                <div className="container">
                    {/* Blood Bank Section */}
                    <div className="section">
                        <div className="content">
                            <h2>Blood Bank Availability</h2>
                            <p className="subtitle2">
                                Find out you prefered blood at and ease of one click
                            </p>
                            <button className="check-button">
                                Check Availability
                            </button>
                        </div>
                        <div className="bb-image-container">
                            <img
                                src="https://www.drsstantiamch.org/uploads/infrastructure/blood_bank.jpg"
                            />
                        </div>
                    </div>

                    {/* Bed Availability Section */}
                    <div className="section">
                        <div className="content">
                            <h2>Check Bed Availability</h2>
                            <p className="subtitle2">
                                Checkout Availability of Beds in Hospital Rooms at various locations
                            </p>
                            <button className="check-button">
                                Check
                            </button>
                        </div>
                        <div className="bb-image-container">
                            <img
                                src="https://www.medplushealth.ca/wp-content/uploads/bigstock-Clean-Empty-Bed-In-A-Hospital-282271810-1024x683.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="find-doctors">
                <div className="overlay">
                    <div className="content">
                        <h1>FIND DOCTORS</h1>
                        <p className="subtitle 2">
                            Find out Doctors from various specializations and departments on a go. Checkout theri ratings and work, refer for better and healthy treatment
                        </p>
                        <button className="find-button">Find</button>
                    </div>
                </div>
            </div>
            <BlogsNews />
        </>
    );
};


export default HomePage;
