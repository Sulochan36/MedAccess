// dashpages/NonMedicalStaff/NonMedicalStaff.jsx
import React, { useState, useEffect } from 'react';
import NonMedicalStaffForm from '../../components/NonMedicalStaff/NonMedicalStaffForm';
import NonMedicalStaffTable from '../../components/NonMedicalStaff/NonMedicalStaffTable';
import { fetchNonMedicalStaff, addNonMedicalStaff, updateNonMedicalStaff, deleteNonMedicalStaff } from '../../api/nonMedicalStaffApi';

const NonMedicalStaff = ({ hospitalId }) => {
    const [staff, setStaff] = useState([]);
    const [editingStaff, setEditingStaff] = useState(null);

    // Fetch the staff data when the component mounts
    useEffect(() => {
        const getStaffData = async () => {
            const staffData = await fetchNonMedicalStaff(hospitalId);
            setStaff(staffData);
        };
        getStaffData();
    }, [hospitalId]);

    const handleAddStaff = async (staffData) => {
        const newStaff = await addNonMedicalStaff(hospitalId, staffData);
        setStaff([...staff, newStaff]);
    };

    const handleUpdateStaff = async (staffId, staffData) => {
        const updatedStaff = await updateNonMedicalStaff(staffId, staffData);
        setStaff(staff.map((s) => (s._id === updatedStaff._id ? updatedStaff : s)));
        setEditingStaff(null);
    };

    const handleDeleteStaff = async (staffId) => {
        await deleteNonMedicalStaff(staffId);
        setStaff(staff.filter((s) => s._id !== staffId));
    };

    return (
        <div className="non-medical-staff-container">
            <h2 className="non-medical-staff-title">Non-Medical Staff Management</h2>
            <NonMedicalStaffForm
                staff={staff}
                setStaff={setStaff}
                hospitalId={hospitalId}
                editingStaff={editingStaff}
                setEditingStaff={setEditingStaff}
                handleAddStaff={handleAddStaff}
                handleUpdateStaff={handleUpdateStaff}
            />
            <NonMedicalStaffTable
                staff={staff}
                setStaff={setStaff}
                handleDeleteStaff={handleDeleteStaff}
                setEditingStaff={setEditingStaff}
            />
        </div>
    );
};

export default NonMedicalStaff;
