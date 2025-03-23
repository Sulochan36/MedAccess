// components/NonMedicalStaffTable.jsx
import React from "react";
import NonMedicalStaffItem from "./NonMedicalStaffItem.jsx";

const NonMedicalStaffTable = ({ staff, setStaff, setEditingStaff }) => {
    return (
        <table className="staff-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {staff.map((staffMember) => (
                    <NonMedicalStaffItem
                        key={staffMember._id}
                        staff={staffMember}
                        setStaff={setStaff}
                        setEditingStaff={setEditingStaff}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default NonMedicalStaffTable;
