import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

const MedicineTable = ({ filterType, filterStatus, searchQuery, refreshTrigger }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMedicines();
    }, [page, size, filterType, filterStatus, searchQuery, refreshTrigger]);

    const fetchMedicines = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:8080/api/medicines?page=${page}&size=${size}`;
            if (filterType) url += `&type=${filterType}`;
            if (filterStatus) url += `&status=${filterStatus}`;
            if (searchQuery) url += `&search=${searchQuery}`;

            const response = await fetch(url);
            const data = await response.json();

            setMedicines(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="card" style={{ marginTop: '2rem' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3>Medicine List</h3>
                <div>
                    {/* Filter indicators could go here */}
                    {(filterType || filterStatus || searchQuery) &&
                        <span className="badge bg-secondary">
                            Filters: {filterType} {filterStatus} {searchQuery && `"${searchQuery}"`}
                        </span>
                    }
                </div>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Manufacturer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                        ) : medicines.length === 0 ? (
                            <tr><td colSpan="6" className="text-center">No medicines found.</td></tr>
                        ) : (
                            medicines.map(med => (
                                <tr key={med.id}>
                                    <td>#{med.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{med.medicineName}</div>
                                        <small className="text-muted">{med.genericName}</small>
                                    </td>
                                    <td>{med.type}</td>
                                    <td><StatusBadge status={med.status} /></td>
                                    <td>{med.manufacturer}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => navigate(`/medicine/${med.id}`)}
                                        >
                                            View / Manage
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Footer */}
            <div className="card-footer d-flex justify-content-between align-items-center">
                <div>
                    Showing {medicines.length > 0 ? page * size + 1 : 0} to {Math.min((page + 1) * size, totalElements)} of {totalElements} medicines
                </div>
                <div className="d-flex align-items-center gap-2">
                    <select
                        className="form-select form-select-sm"
                        value={size}
                        onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
                        style={{ width: 'auto' }}
                    >
                        <option value="10">10 / page</option>
                        <option value="20">20 / page</option>
                        <option value="50">50 / page</option>
                    </select>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link">Page {page + 1} of {totalPages || 1}</span>
                            </li>
                            <li className={`page-item ${page === totalPages - 1 || totalPages === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MedicineTable;
