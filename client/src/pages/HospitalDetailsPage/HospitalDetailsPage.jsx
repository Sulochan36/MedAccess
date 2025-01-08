import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import './HospitalDetailsPage.css';

const HospitalDetailsPage = () => {
    const { id } = useParams(); // Use the hook to get the 'id' from the URL
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
        return <div>Loading...</div>;
    }

    if (!hospital) {
        return <div>Hospital not found</div>;
    }

    const imageUrl = hospital.profilePhoto
        ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`
        : '/default-avatar.png';

    return (
        <div className="hospital-details">
            <h1 className="hospital-details__name">{hospital.hospitalName}</h1>
            <img className="hospital-details__profile" src={imageUrl} alt={hospital.hospitalName} />
            <div className="hospital-details__info">
                <p><strong>Email:</strong> {hospital.email}</p>
                <p><strong>Contact:</strong> {hospital.contact}</p>
                <p><strong>Address:</strong> {hospital.address.street}, {hospital.address.city}, {hospital.address.state} - {hospital.address.zipCode}</p>
                <p><strong>Registration Number:</strong> {hospital.registrationNumber}</p>
                <p><strong>About:</strong> {hospital.about}</p>
                <p><strong>Website:</strong> <a href={hospital.websiteUrl} target="_blank" rel="noopener noreferrer">{hospital.websiteUrl}</a></p>
            </div>
        </div>
    );
};

export default HospitalDetailsPage;
