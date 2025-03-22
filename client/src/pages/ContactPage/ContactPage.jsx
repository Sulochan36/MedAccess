import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      {/* Contact Hero */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p className='ptxt'>We're here to help and answer any questions you might have</p>
      </div>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-card">
            <Phone className="info-icon" />
            <h3>Phone</h3>
            <p>Emergency: +1 (555) 123-4567</p>
            <p>General: +1 (555) 765-4321</p>
          </div>

          <div className="info-card">
            <Mail className="info-icon" />
            <h3>Email</h3>
            <p>info@medaccess.com</p>
            <p>support@medaccess.com</p>
          </div>

          <div className="info-card">
            <MapPin className="info-icon" />
            <h3>Location</h3>
            <p>123 Healthcare Avenue</p>
            <p>Medical District, NY 10001</p>
          </div>

          <div className="info-card">
            <Clock className="info-icon" />
            <h3>Hours</h3>
            <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p>Saturday: 9:00 AM - 5:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
