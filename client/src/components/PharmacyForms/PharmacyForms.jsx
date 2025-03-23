import { useState, useEffect } from "react";
import { addMedicine, updateMedicine } from "../../api/pharmacyApi";

const PharmacyForm = ({ medicines, setMedicines, editingMedicine, setEditingMedicine }) => {
    const [formData, setFormData] = useState({
        medicineName: "",
        category: "",
        brand: "",
        quantity: 0,
        price: 0,
        expiryDate: "",
    });

    useEffect(() => {
        if (editingMedicine) {
            setFormData({
                medicineName: editingMedicine.medicineName,
                category: editingMedicine.category,
                brand: editingMedicine.brand || "",
                quantity: editingMedicine.quantity,
                price: editingMedicine.price,
                expiryDate: new Date(editingMedicine.expiryDate).toISOString().slice(0, 10),
            });
        } else {
            setFormData({
                medicineName: "",
                category: "",
                brand: "",
                quantity: 0,
                price: 0,
                expiryDate: "",
            });
        }
    }, [editingMedicine]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingMedicine) {
            const updatedMedicine = await updateMedicine(editingMedicine._id, formData);
            setMedicines(
                medicines.map((m) => (m._id === editingMedicine._id ? updatedMedicine : m))
            );
            setEditingMedicine(null);
        } else {
            const newMedicine = await addMedicine(formData);
            setMedicines([...medicines, newMedicine]);
        }
        setFormData({
            medicineName: "",
            category: "",
            brand: "",
            quantity: 0,
            price: 0,
            expiryDate: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="pharmacy-form">
            <input
                type="text"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="Medicine Name"
                required
            />
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
            />
            <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
            />
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
            />
            <button type="submit" className="submit-btn">
                {editingMedicine ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default PharmacyForm;
