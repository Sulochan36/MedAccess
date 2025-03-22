// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import the useParams hook
// import './HospitalDetailsPage.css';

// const HospitalDetailsPage = () => {
//     const { id } = useParams(); // Use the hook to get the 'id' from the URL
//     const [hospital, setHospital] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchHospitalDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/users/hospitals/${id}`);
//                 setHospital(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching hospital details:', error);
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchHospitalDetails();
//         }
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!hospital) {
//         return <div>Hospital not found</div>;
//     }

//     const imageUrl = hospital.profilePhoto
//         ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`
//         : '/default-avatar.png';

//     return (
//         <div className="hospital-details">
//             <h1 className="hospital-details__name">{hospital.hospitalName}</h1>
//             <img className="hospital-details__profile" src={imageUrl} alt={hospital.hospitalName} />
//             <div className="hospital-details__info">
//                 <p><strong>Email:</strong> {hospital.email}</p>
//                 <p><strong>Contact:</strong> {hospital.contact}</p>
//                 <p><strong>Address:</strong> {hospital.address.street}, {hospital.address.city}, {hospital.address.state} - {hospital.address.zipCode}</p>
//                 <p><strong>Registration Number:</strong> {hospital.registrationNumber}</p>
//                 <p><strong>About:</strong> {hospital.about}</p>
//                 <p><strong>Website:</strong> <a href={hospital.websiteUrl} target="_blank" rel="noopener noreferrer">{hospital.websiteUrl}</a></p>
//             </div>
//         </div>
//     );
// };

// export default HospitalDetailsPage;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './HospitalDetailsPage.css';

// const HospitalDetailsPage = () => {
//     const { id } = useParams();
//     const [hospital, setHospital] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchHospitalDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/users/hospitals/${id}`);
//                 setHospital(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching hospital details:', error);
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchHospitalDetails();
//         }
//     }, [id]);

//     if (loading) {
//         return <div className="loading-state">Loading...</div>;
//     }

//     if (!hospital) {
//         return <div className="error-state">Hospital not found</div>;
//     }

//     const imageUrl = !hospital.profilePhoto
//         ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`
//         : 'https://i.pinimg.com/736x/b7/98/c9/b798c9b37babf75f4d136fe4dbf8e771.jpg';

//     return (
//         <div className="hospital-details">
//             <div className="hospital-details__header">
//                 <h1 className="hospital-details__name">{hospital.hospitalName}</h1>
//                 <img
//                     src={imageUrl}
//                     alt={hospital.hospitalName}
//                     className="hospital-details__profile"
//                 />
//             </div>

//             <div className="hospital-details__content">
//                 <div className="hospital-details__section">
//                     <h2>Contact Information</h2>
//                     <div className="hospital-details__info-grid">
//                         <div className="info-item">
//                             <span className="label">Email</span>
//                             <span className="value">{hospital.email}</span>
//                         </div>
//                         <div className="info-item">
//                             <span className="label">Contact</span>
//                             <span className="value">{hospital.contact}</span>
//                         </div>
//                         <div className="info-item">
//                             <span className="label">Registration</span>
//                             <span className="value">{hospital.registrationNumber}</span>
//                         </div>
//                         <div className="info-item">
//                             <span className="label">Website</span>
//                             <a href={hospital.websiteUrl} target="_blank" rel="noopener noreferrer" className="value link">
//                                 {hospital.websiteUrl}
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="hospital-details__section">
//                     <h2>Location</h2>
//                     <address className="hospital-details__address">
//                         {hospital.address.street},<br />
//                         {hospital.address.city}, {hospital.address.state}<br />
//                         {hospital.address.zipCode}
//                     </address>
//                 </div>

//                 <div className="hospital-details__section">
//                     <h2>About Us</h2>
//                     <p className="hospital-details__about">{hospital.about}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HospitalDetailsPage;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, FileText } from 'lucide-react';
import './HospitalDetailsPage.css';

const HospitalDetailsPage = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/hospitals/${id}`);
                setHospital(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hospital details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchHospitalDetails();
        }
    }, [id]);

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (!hospital) {
        return <div className="error-state">Hospital not found</div>;
    }

    const imageUrl = hospital.profilePhoto
        ? hospital.profilePhoto
        : 'https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ';

    return (
        <div className="hospital-page">
            <div className="hospital-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="hospital-hero__overlay">
                    <div className="hospital-hero__content">
                        <h1 className="hospital-hero__title">{hospital.hospitalName}</h1>
                        <div className="hospital-hero__location">
                            <MapPin className="icon" />
                            <span>{hospital.address.city}, {hospital.address.state}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hospital-content">
                <div className="quick-info">
                    <div className="quick-info__card">
                        <Phone className="quick-info__icon" />
                        <div className="quick-info__text">
                            <h3>Contact</h3>
                            <p>{hospital.contact}</p>
                        </div>
                    </div>
                    <div className="quick-info__card">
                        <Mail className="quick-info__icon" />
                        <div className="quick-info__text">
                            <h3>Email</h3>
                            <p>{hospital.email}</p>
                        </div>
                    </div>
                    <div className="quick-info__card">
                        <Globe className="quick-info__icon" />
                        <div className="quick-info__text">
                            <h3>Website</h3>
                            <a href={hospital.websiteUrl} target="_blank" rel="noopener noreferrer">
                                Visit Website
                            </a>
                        </div>
                    </div>
                    <div className="quick-info__card">
                        <FileText className="quick-info__icon" />
                        <div className="quick-info__text">
                            <h3>Registration</h3>
                            <p>{hospital.registrationNumber}</p>
                        </div>
                    </div>
                </div>

                <div className="hospital-sections">
                    <section className="info-section">
                        <h2>About Us</h2>
                        <div className="info-section__content">
                            <p>{hospital.hospitalName} is a leading healthcare institution dedicated to providing high-quality medical care with compassion and expertise. Equipped with state-of-the-art technology and a team of experienced doctors, nurses, and specialists, we offer a wide range of medical services, including cardiology, orthopedics, neurology, oncology, and maternity care. Our hospital operates 24/7, ensuring that patients receive immediate and effective treatment, whether for routine check-ups, emergency care, or specialized procedures.

With a patient-first approach, we focus on personalized treatment, affordability, and accessibility, making quality healthcare available to all. Our commitment to excellence extends beyond treatment to research, innovation, and community health initiatives. At [Hospital Name], we strive to create a comfortable and safe environment where every patient receives the best possible care for a healthier future.</p>
                        </div>
                    </section>

                    <section className="info-section">
                        <h2>Location & Address</h2>
                        <div className="info-section__content">
                            <div className="address-card">
                                <MapPin className="address-card__icon" />
                                <address>
                                    {hospital.address.street}<br />
                                    {hospital.address.city}, {hospital.address.state}<br />
                                    {hospital.address.zipCode}
                                </address>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HospitalDetailsPage;
