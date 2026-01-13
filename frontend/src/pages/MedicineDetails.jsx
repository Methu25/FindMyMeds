import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, CheckCircle, XCircle, Trash2, Box } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import ConfirmationModal from '../components/common/ConfirmationModal';
import AddMedicine from './AddMedicine'; // Reusing AddMedicine as Update Panel? Or create separate?
// A separate Update Component is cleaner or we can just use a side panel.
// For now, I'll implement a simple Update Side Panel within this file or separate.
// Let's create a simple side panel inside this file to match requirements.

const MedicineDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modals
    const [showActivateModal, setShowActivateModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showUpdatePanel, setShowUpdatePanel] = useState(false);

    // Update Form State
    const [updateForm, setUpdateForm] = useState({});

    useEffect(() => {
        fetchMedicine();
    }, [id]);

    const fetchMedicine = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/medicines/${id}`);
            if (response.ok) {
                const data = await response.json();
                setMedicine(data);
                setUpdateForm(data); // Initialize update form
            } else {
                alert("Medicine not found");
                navigate('/medicine');
            }
        } catch (error) {
            console.error("Error fetching medicine:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/medicines/${id}/status?status=${newStatus}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                fetchMedicine(); // Refresh
                setShowActivateModal(false);
                setShowDeactivateModal(false);
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleRemove = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/medicines/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                navigate('/medicine');
            } else {
                alert("Failed to remove medicine");
            }
        } catch (error) {
            console.error("Error removing medicine:", error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/medicines/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateForm)
            });
            if (response.ok) {
                fetchMedicine();
                setShowUpdatePanel(false);
            } else {
                alert("Failed to update medicine");
            }
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (!medicine) return <div className="p-4 text-center">Medicine not found</div>;

    return (
        <div className="container-fluid p-4 position-relative" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            <div className="d-flex align-items-center mb-4 gap-3">
                <button className="btn btn-outline-secondary btn-sm rounded-circle p-2" onClick={() => navigate('/medicine')}>
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-secondary fw-bold mb-0">Medicine Details</h2>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                                <h3 className="fw-bold mb-1">{medicine.medicineName}</h3>
                                <div className="text-muted mb-2">{medicine.genericName || 'No generic name'}</div>
                                <StatusBadge status={medicine.status} />
                            </div>
                            <div className="bg-light p-3 rounded text-center">
                                <Box size={40} className="text-secondary mb-2" />
                                <div className="fw-bold text-secondary small">{medicine.type}</div>
                            </div>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Manufacturer</h6>
                                <p className="mb-0 fw-medium">{medicine.manufacturer || '-'}</p>
                                <small className="text-muted">{medicine.countryOfManufacture}</small>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Registration No.</h6>
                                <p className="mb-0">{medicine.registrationNumber || '-'}</p>
                            </div>
                            <div className="col-12">
                                <h6 className="text-secondary fw-bold text-uppercase small">Description</h6>
                                <p className="mb-0 text-muted">{medicine.description || 'No description provided.'}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Storage Instructions</h6>
                                <p className="mb-0">{medicine.storageInstructions || '-'}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Dosage Form</h6>
                                <p className="mb-0">{medicine.dosageForm || '-'}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Registered Date</h6>
                                <p className="mb-0 text-muted">{new Date(medicine.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-secondary fw-bold text-uppercase small">Last Updated</h6>
                                <p className="mb-0 text-muted">{new Date(medicine.lastUpdated).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-3">
                        <button className="btn btn-primary px-4" onClick={() => setShowUpdatePanel(true)}>
                            <Edit size={18} className="me-2" /> Update Medicine
                        </button>
                        {medicine.status === 'INACTIVE' ? (
                            <button className="btn btn-success px-4" onClick={() => setShowActivateModal(true)}>
                                <CheckCircle size={18} className="me-2" /> Activate
                            </button>
                        ) : (
                            <button className="btn btn-warning px-4 text-white" onClick={() => setShowDeactivateModal(true)}>
                                <XCircle size={18} className="me-2" /> Deactivate
                            </button>
                        )}
                        <button className="btn btn-danger px-4" onClick={() => setShowRemoveModal(true)}>
                            <Trash2 size={18} className="me-2" /> Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Update Side Panel (Simple Implementation) */}
            {showUpdatePanel && (
                <div
                    className="position-fixed top-0 end-0 h-100 bg-white shadow-lg p-4"
                    style={{ width: '450px', zIndex: 1050, overflowY: 'auto' }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">Update Medicine</h4>
                        <button className="btn btn-sm btn-light rounded-circle" onClick={() => setShowUpdatePanel(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="medicineName" value={updateForm.medicineName} onChange={handleUpdateChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Generic Name</label>
                            <input type="text" className="form-control" name="genericName" value={updateForm.genericName} onChange={handleUpdateChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select className="form-select" name="type" value={updateForm.type} onChange={handleUpdateChange}>
                                {["TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM_OINTMENT", "DROPS", "INHALER", "SUSPENSION", "OTHER"].map(t => (
                                    <option key={t} value={t}>{t.replace('_', ' ')}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={updateForm.description} onChange={handleUpdateChange} rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Manufacturer</label>
                            <input type="text" className="form-control" name="manufacturer" value={updateForm.manufacturer} onChange={handleUpdateChange} />
                        </div>
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                            <button type="button" className="btn btn-light border" onClick={() => setShowUpdatePanel(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {showUpdatePanel && <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setShowUpdatePanel(false)}></div>}

            {/* Modals */}
            <ConfirmationModal
                isOpen={showActivateModal}
                title="Activate Medicine"
                message={`Are you sure you want to activate ${medicine.medicineName}? It will become available for reservations.`}
                onConfirm={() => handleStatusChange('ACTIVE')}
                onClose={() => setShowActivateModal(false)}
                confirmText="Activate"
                type="success"
            />
            <ConfirmationModal
                isOpen={showDeactivateModal}
                title="Deactivate Medicine"
                message={`Are you sure you want to deactivate ${medicine.medicineName}? It will not be available for new reservations.`}
                onConfirm={() => handleStatusChange('INACTIVE')}
                onClose={() => setShowDeactivateModal(false)}
                confirmText="Deactivate"
                type="warning"
            />
            <ConfirmationModal
                isOpen={showRemoveModal}
                title="Remove Medicine"
                message="This will soft-delete the medicine from the registry. It won't be permanently deleted but will be hidden. Continue?"
                onConfirm={handleRemove}
                onClose={() => setShowRemoveModal(false)}
                confirmText="Remove"
                type="danger"
            />
        </div>
    );
};

export default MedicineDetails;
