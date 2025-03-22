import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Droplet, MapPin, Phone, AlertCircle } from 'lucide-react';
import './BloodBankDetailPage.css';

const BloodBankDetailPage = () => {
    const { bloodGroup } = useParams();
    const [hospitalData, setHospitalData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/blood-bank/${bloodGroup}`);
                setHospitalData(response.data);
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitalData();
    }, [bloodGroup]);

    const getAvailabilityStatus = (units) => {
        if (units >= 10) return 'high';
        if (units >= 5) return 'medium';
        return 'low';
    };

    if (loading) {
        return <div className="loading-state">Loading blood bank information...</div>;
    }

    return (
        <div className="blood-bank-detail-page">
            <div className="blood-group-header">
                <Droplet className="blood-icon" />
                <h2 className="page-title">Blood Group {bloodGroup}</h2>
            </div>

            <div className="availability-summary">
                <div className="summary-card">
                    <h3>Total Locations</h3>
                    <span className="summary-value">{hospitalData.length}</span>
                </div>
                <div className="summary-card">
                    <h3>Total Units Available</h3>
                    <span className="summary-value">
                        {hospitalData.reduce((sum, bank) => sum + bank.unitsAvailable, 0)}
                    </span>
                </div>
            </div>

            {hospitalData.length === 0 ? (
                <div className="no-data">
                    <AlertCircle size={48} />
                    <p>No blood banks found with {bloodGroup} blood group availability</p>
                </div>
            ) : (
                <div className="blood-banks-grid">
                    {hospitalData.map((bloodBank, index) => (
                        <div key={index} className="blood-bank-card">
                            <div className="card-header">
                                <h3>{bloodBank.hospital.hospitalName}</h3>
                                <span className={`availability-badge ${getAvailabilityStatus(bloodBank.unitsAvailable)}`}>
                                    {bloodBank.unitsAvailable} Units
                                </span>
                            </div>
                            <div className="card-content">
                                <div className="info-row">
                                    <MapPin className="info-icon" />
                                    <p>{bloodBank.hospital.address.street}, {bloodBank.hospital.address.city}, {bloodBank.hospital.address.state} {bloodBank.hospital.address.zipCode}</p>
                                </div>
                                <div className="info-row">
                                    <Phone className="info-icon" />
                                    <p>{bloodBank.hospital.contact}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BloodBankDetailPage;
