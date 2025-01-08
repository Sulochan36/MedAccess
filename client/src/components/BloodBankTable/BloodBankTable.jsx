import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import './BloodBankTable.css';

const BloodBankTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 8; // Since we have 8 predefined blood groups

    useEffect(() => {
        fetchBloodGroups();
    }, []);

    const fetchBloodGroups = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/blood-bank/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.data) {
                const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
                const bloodData = bloodGroups.map(bloodGroup => {
                    const existing = response.data.find(item => item.bloodGroup === bloodGroup);
                    return existing ? existing : { bloodGroup, unitsAvailable: 0, lastUpdated: null };
                });
                setData(bloodData);
            }
        } catch (error) {
            console.error("Error fetching blood groups", error);
        }
    };


    // Handle updating units available
    const handleUnitsChange = async (index, value) => {
        const newData = [...data];
        newData[index].unitsAvailable = value;
        setData(newData);  // Optimistically update the UI

        const bloodGroup = newData[index].bloodGroup;
        console.log("Updating:", { bloodGroup, unitsAvailable: value });  // Log the data you're sending

        try {
            const response = await axios.put(
                "http://localhost:5000/api/blood-bank/update",
                { bloodGroup, unitsAvailable: value },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            // Update the row with response data from the server
            newData[index] = response.data;
            setData(newData);
        } catch (error) {
            console.error("Error updating blood units", error);
        }
    };


    // Pagination logic
    const pageCount = Math.ceil(data.length / rowsPerPage);
    const currentPageData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            <h2>Blood Bank Inventory</h2>
            <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th>Blood Group</th>
                        <th>Units Available</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.bloodGroup}</td>
                            <td>
                                <input
                                    type="number"
                                    value={row.unitsAvailable}  // Bind value to unitsAvailable in state
                                    onChange={(e) =>
                                        handleUnitsChange(index, parseInt(e.target.value) || 0)  // Update on change
                                    }
                                />
                            </td>
                            <td>
                                {row.lastUpdated
                                    ? new Date(row.lastUpdated).toLocaleString()
                                    : "Not updated yet"}
                            </td>
                            <td>
                                {row.unitsAvailable > 5
                                    ? "Available"
                                    : row.unitsAvailable > 0
                                        ? "Low Stock"
                                        : "Out of Stock"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page"}
                previousClassName={"previous"}
                nextClassName={"next"}
                disabledClassName={"disabled"}
            />
        </div>
    );
};

export default BloodBankTable;
