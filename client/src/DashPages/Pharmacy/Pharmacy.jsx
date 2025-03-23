import { useState, useEffect } from "react";
import PharmacyForm from "../../components/PharmacyForms/PharmacyForms.jsx";
import PharmacyTable from "../../components/PharmacyTable/PharmacyTable.jsx";
import { fetchMedicines } from "../../api/pharmacyApi.js";
import "../../components/Pharmacy.css"; // Import CSS file

const Pharmacy = () => {
    const [medicines, setMedicines] = useState([]);
    const [editingMedicine, setEditingMedicine] = useState(null);  // Manage editing state

    useEffect(() => {
        fetchMedicines().then(setMedicines);
    }, []);

    return (
        <div className="pharmacy-container">
            <h2 className="pharmacy-title">Pharmacy Management</h2>

            {/* Pass editingMedicine and setEditingMedicine to PharmacyForm */}
            <PharmacyForm
                medicines={medicines}
                setMedicines={setMedicines}
                editingMedicine={editingMedicine}
                setEditingMedicine={setEditingMedicine}
            />

            {/* Pass setEditingMedicine to PharmacyTable */}
            <PharmacyTable
                medicines={medicines}
                setMedicines={setMedicines}
                setEditingMedicine={setEditingMedicine}
            />
        </div>
    );
};

export default Pharmacy;
