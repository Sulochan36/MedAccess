import React from 'react';
import { Heart, Clock, Award, Users, Phone, Mail, MapPin } from 'lucide-react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About MedAccess</h1>
        <p className="hero-subtitle">Committed to Excellence in Healthcare</p>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At MedAccess, our mission is to revolutionize healthcare accessibility by providing a seamless, user-friendly platform that connects individuals, healthcare practitioners, medical providers, and health centers. We strive to empower users with real-time access to hospital resources, doctor schedules, and critical medical services such as blood availability and emergency care. By enabling hospitals and solo practitioners to register and expand their reach, we aim to create a more connected, efficient, and responsive healthcare ecosystem for everyone.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <Heart className="feature-icon" />
          <h3>Quality Care</h3>
          <p>We provide the highest standard of medical care with a focus on patient comfort and recovery.</p>
        </div>

        <div className="feature-card">
          <Clock className="feature-icon" />
          <h3>24/7 Service</h3>
          <p>Our facilities and emergency services are available round the clock for your medical needs.</p>
        </div>

        <div className="feature-card">
          <Award className="feature-icon" />
          <h3>Expert Doctors</h3>
          <p>Our team consists of highly qualified and experienced medical professionals.</p>
        </div>

        <div className="feature-card">
          <Users className="feature-icon" />
          <h3>Patient-Centric</h3>
          <p>We prioritize patient comfort and satisfaction in all our services.</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <h2>Our Journey</h2>
        <p style={{color:"#7E5DC6"}}>MedAccess began with a vision to bridge the gap between patients and healthcare at VIT Bhopal University we head to this by leveraging technology to streamline access to essential medical services. Recognizing the challenges people face in finding hospitals, booking doctor appointments, and locating critical resources like blood availability, we set out to create a platform that simplifies healthcare navigation. Through continuous innovation and collaboration with healthcare professionals, we have built a system that not only enhances accessibility but also improves efficiency for hospitals and solo practitioners. Our journey is driven by a commitment to making quality healthcare more accessible, connected, and responsive for everyone.</p>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Excellence</h3>
            <p>Striving for the highest quality in healthcare services</p>
          </div>
          <div className="value-item">
            <h3>Compassion</h3>
            <p>Treating every patient with care and empathy</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>Embracing new medical technologies and treatments</p>
          </div>
          <div className="value-item">
            <h3>Integrity</h3>
            <p>Maintaining the highest ethical standards in healthcare</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
