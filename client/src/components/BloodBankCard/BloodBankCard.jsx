import React from 'react';
import { Link } from 'react-router-dom';
import './BloodBankCard.css';

const BloodBankCard = ({ blood }) => {
    return (
        <div className="blood-card">
            <h2 className="blood-group">{blood.bloodGroup}</h2>
            <p className="available-units">
                Total Available Units: {blood.totalAvailableUnits} units
            </p>
            <p className="last-updated">
                Last updated: {blood.lastUpdated}
            </p>

            {/* Link to BloodBankDetailPage */}
            <Link to={`/blood-bank/${blood.bloodGroup}`}>
                <button className="request-button">View the List</button>
            </Link>
        </div>
    );
};

export default BloodBankCard;
