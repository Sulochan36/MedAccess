import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the doctor ID from URL
import './DoctorDetailsPage.css';

const DoctorDetailsPage = () => {
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams(); // Get the doctor ID from the URL parameter

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/doctors/${id}`);
                setDoctor(response.data); // Store the doctor details
                console.log(doctor); // Log the doctor object to inspect its structure

            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        };

        fetchDoctorDetails();
    }, [id]); // Run the effect when the doctor ID changes

    if (!doctor) {
        return <div>Loading...</div>;
    }

    const imageUrl = doctor.profilePhoto
        ? `http://localhost:5000${doctor.profilePhoto}`
        : '/default-avatar.png';

    return (
        <div className="doctor-details-page">
            <h1>{doctor.fullName}</h1>
            <img src={imageUrl} alt={doctor.fullName} className="doctor-profile-image" />
            <div className="doctor-details">
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Hospital:</strong> {doctor.affiliateHospital ? doctor.affiliateHospital.name : "Not affiliated"}</p>
                <p><strong>Clinic Timings:</strong> {doctor.clinicTimings}</p>
                <p><strong>Contact:</strong> {doctor.contact || "Not available"}</p>
                <p><strong>About:</strong> {doctor.aboutYourself || "No information available"}</p>
                <p><strong>Website:</strong> <a href={doctor.websiteUrl} target="_blank" rel="noopener noreferrer">{doctor.websiteUrl || "Not provided"}</a></p>
                <p><strong>Clinic Address:</strong>
                    {doctor.clinicAddress
                        ? `${doctor.clinicAddress.street}, ${doctor.clinicAddress.city}, ${doctor.clinicAddress.state} - ${doctor.clinicAddress.zipCode}`
                        : "No address available"}
                </p>
            </div>
        </div>
    );
};

export default DoctorDetailsPage;
