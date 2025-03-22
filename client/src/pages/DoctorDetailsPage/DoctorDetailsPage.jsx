import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    User,
    Stethoscope,
    Calendar,
    Clock,
    Phone,
    Globe,
    MapPin,
    Building,
    AlertCircle
} from 'lucide-react';
import './DoctorDetailsPage.css';

const DoctorDetailsPage = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/doctors/${id}`);
                setDoctor(response.data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [id]);

    if (loading) {
        return <div className="loading-state">Loading doctor information...</div>;
    }

    if (!doctor) {
        return (
            <div className="error-state">
                <AlertCircle size={48} />
                <p>Doctor information not found</p>
            </div>
        );
    }

    const imageUrl = doctor.profilePhoto
        ? doctor.profilePhoto
        : 'https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg';

    return (
        <div className="doctor-details-page">
            <div className="doctor-profile-header">
                <div className="profile-image-container">
                    <img src={imageUrl} alt={doctor.fullName} className="doctor-profile-image" />
                </div>
                <div className="profile-header-content">
                    <h1>{doctor.fullName}</h1>
                    <div className="specialization-badge">
                        <Stethoscope size={20} />
                        {doctor.specialization}
                    </div>
                    <div className="experience-badge">
                        {doctor.experience} Years of Experience
                    </div>
                </div>
            </div>

            <div className="doctor-details-grid">
                <div className="info-card">
                    <h2>About Doctor</h2>
                    <p>{doctor.aboutYourself || "No information available"}</p>
                </div>

                <div className="info-card">
                    <h2>Professional Information</h2>
                    <div className="info-list">
                        <div className="info-item">
                            <Building className="info-icon" />
                            <div className="info-content">
                                <h3>Hospital Affiliation</h3>
                                <p>{doctor.affiliateHospital ? doctor.affiliateHospital.name : "Not affiliated"}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Clock className="info-icon" />
                            <div className="info-content">
                                <h3>Clinic Timings</h3>
                                <p>{doctor.clinicTimings}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Globe className="info-icon" />
                            <div className="info-content">
                                <h3>Website</h3>
                                <a href={doctor.websiteUrl} target="_blank" rel="noopener noreferrer">
                                    {doctor.websiteUrl || "Not provided"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-card">
                    <h2>Contact Information</h2>
                    <div className="info-list">
                        <div className="info-item">
                            <Phone className="info-icon" />
                            <div className="info-content">
                                <h3>Contact Number</h3>
                                <p>{doctor.contact || "Not available"}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <div className="info-content">
                                <h3>Clinic Address</h3>
                                <p>
                                    {doctor.clinicAddress
                                        ? `${doctor.clinicAddress.street}, ${doctor.clinicAddress.city}, ${doctor.clinicAddress.state} - ${doctor.clinicAddress.zipCode}`
                                        : "No address available"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;
