import PharmacyItem from "../PharmacyItem/PharmacyItem";

const PharmacyTable = ({ medicines, setMedicines, setEditingMedicine }) => {
    return (
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
                {medicines.map((medicine) => (
                    <PharmacyItem
                        key={medicine._id}
                        medicine={medicine}
                        setMedicines={setMedicines}
                        setEditingMedicine={setEditingMedicine}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default PharmacyTable;
