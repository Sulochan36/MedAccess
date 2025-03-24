import { useState, useEffect } from "react";
import PharmacyItem from "../PharmacyItem/PharmacyItem";

const PharmacyTable = ({ medicines, setMedicines, setEditingMedicine }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMedicines, setFilteredMedicines] = useState(medicines);

    useEffect(() => {
        const filtered = medicines.filter((medicine) => {
            const name = medicine.name ? medicine.name.toLowerCase() : "";
            const category = medicine.category ? medicine.category.toLowerCase() : "";
            const brand = medicine.brand ? medicine.brand.toLowerCase() : "";

            return (
                name.includes(searchQuery.toLowerCase()) ||
                category.includes(searchQuery.toLowerCase()) ||
                brand.includes(searchQuery.toLowerCase())
            );
        });
        setFilteredMedicines(filtered);
    }, [searchQuery, medicines]);

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            {/* Medicines Table */}
            <table className="pharmacy-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Expiry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMedicines.map((medicine) => (
                        <PharmacyItem
                            key={medicine._id}
                            medicine={medicine}
                            setMedicines={setMedicines}
                            setEditingMedicine={setEditingMedicine}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PharmacyTable;
