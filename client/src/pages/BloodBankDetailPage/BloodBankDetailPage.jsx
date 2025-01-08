import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BloodBankDetailPage.css';

const BloodBankDetailPage = () => {
    const { bloodGroup } = useParams(); // Get the blood group from the URL
    const [hospitalData, setHospitalData] = useState([]);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                // Fetch hospital data for the selected blood group
                const response = await axios.get(`http://localhost:5000/api/blood-bank/${bloodGroup}`);
                console.log("hospital data:",response.data);
                
                setHospitalData(response.data); // Set the data to display
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            }
        };

        fetchHospitalData();
    }, [bloodGroup]); // Refetch data if bloodGroup changes

    return (
        <div className="blood-bank-detail-page">
            <h2 className="page-title">Blood Bank Details for Blood Group {bloodGroup}</h2>
            <div className="hospital-list-container">
                <table className="hospital-list-table">
                    <thead>
                        <tr>
                            <th className="table-header">Hospital Name</th>
                            <th className="table-header">Units Available</th>
                            <th className="table-header">Address</th>
                            <th className="table-header">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitalData.map((bloodBank, index) => (
                            <tr key={index} className="table-row">
                                <td className="table-cell">{bloodBank.hospital.hospitalName}</td>  {/* Access hospital name */}
                                <td className="table-cell">{bloodBank.unitsAvailable}</td>         {/* Display units available */}
                                <td className="table-cell">{bloodBank.hospital.address.street}, {bloodBank.hospital.address.city}, {bloodBank.hospital.address.state} {bloodBank.hospital.address.zipCode}</td> {/* Access hospital address */}
                                <td className="table-cell">{bloodBank.hospital.contact}</td>        {/* Access hospital contact */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BloodBankDetailPage;
