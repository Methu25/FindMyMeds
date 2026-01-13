import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';

const AddMedicine = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        medicineName: '',
        genericName: '',
        type: 'TABLET',
        manufacturer: '',
        countryOfManufacture: '',
        registrationNumber: '',
        dosageForm: '',
        storageInstructions: '',
        notes: '',
        description: '',
        status: 'ACTIVE' // Default status
    });

    const medicineTypes = [
        "TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM_OINTMENT", "DROPS", "INHALER", "SUSPENSION", "OTHER"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 'ACTIVE' : 'INACTIVE') : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/medicines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Success
                navigate('/medicine'); // Redirect to registry
            } else {
                alert('Failed to add medicine');
            }
        } catch (error) {
            console.error("Error adding medicine:", error);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex align-items-center mb-4 gap-3">
                <button className="btn btn-outline-secondary btn-sm rounded-circle p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-secondary fw-bold mb-0">Add New Medicine</h2>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
                        <h5 className="mb-4 text-primary">Basic Information</h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label">Medicine Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="medicineName"
                                    value={formData.medicineName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Generic Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="genericName"
                                    value={formData.genericName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Medicine Type <span className="text-danger">*</span></label>
                                <select
                                    className="form-select"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    {medicineTypes.map(type => (
                                        <option key={type} value={type}>{type.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="1"
                                ></textarea>
                            </div>
                        </div>

                        <h5 className="mb-4 text-primary">Manufacturer Details</h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label">Manufacturer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="manufacturer"
                                    value={formData.manufacturer}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Country of Manufacture</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="countryOfManufacture"
                                    value={formData.countryOfManufacture}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Registration Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <h5 className="mb-4 text-primary">Additional Info</h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label">Dosage Form</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="dosageForm"
                                    value={formData.dosageForm}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Storage Instructions</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="storageInstructions"
                                    value={formData.storageInstructions}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-4">
                            <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate(-1)}>
                                <X size={18} className="me-2" /> Cancel
                            </button>
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                <Save size={18} className="me-2" /> {loading ? 'Saving...' : 'Add Medicine'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMedicine;
