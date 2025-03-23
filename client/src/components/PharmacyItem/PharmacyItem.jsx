import { deleteMedicine } from "../../api/pharmacyApi";

const PharmacyItem = ({ medicine, setMedicines, setEditingMedicine }) => {

    const handleDelete = async () => {
        try {
            // Call the deleteMedicine function from the API file to delete the medicine
            await deleteMedicine(medicine._id); // This will delete the medicine

            // After successful deletion, update the state to remove the deleted item
            setMedicines((prevMedicines) => prevMedicines.filter((m) => m._id !== medicine._id));
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    return (
        <tr>
            <td>{medicine.medicineName}</td>
            <td>{medicine.category}</td>
            <td>{medicine.brand}</td>
            <td>{medicine.quantity}</td>
            <td>{medicine.price}</td>
            <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
            <td>
                <button onClick={() => setEditingMedicine(medicine)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default PharmacyItem;
