import UpdatePharmacyPanel from '../components/pharmacy/UpdatePharmacyPanel';

const PharmacyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pharmacy, setPharmacy] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', title: '', message: '', actionLabel: '', isDestructive: false, onConfirm: null });
    const [showUpdatePanel, setShowUpdatePanel] = useState(false);


    useEffect(() => {
        fetchPharmacy();
    }, [id]);

    const fetchPharmacy = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacies/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPharmacy(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type) => {
        if (type === 'SUSPEND') {
            setModalConfig({
                isOpen: true,
                title: 'Suspend Pharmacy',
                message: 'Are you sure you want to suspend this pharmacy? They will not be able to operate until activated.',
                actionLabel: 'Suspend',
                isDestructive: true,
                onConfirm: async () => {
                    const res = await fetch(`http://localhost:8080/api/pharmacies/${id}/suspend`, { method: 'POST' });
                    if (res.ok) fetchPharmacy();
                }
            });
        } else if (type === 'ACTIVATE') {
            setModalConfig({
                isOpen: true,
                title: 'Activate Pharmacy',
                message: 'Are you sure you want to activate this pharmacy?',
                actionLabel: 'Activate',
                isDestructive: false,
                onConfirm: async () => {
                    const res = await fetch(`http://localhost:8080/api/pharmacies/${id}/activate`, { method: 'POST' });
                    if (res.ok) fetchPharmacy();
                }
            });
        } else if (type === 'REMOVE') {
            setModalConfig({
                isOpen: true,
                title: 'Remove Pharmacy',
                message: 'Are you sure you want to remove this pharmacy? This action involves soft deletion.',
                actionLabel: 'Remove',
                isDestructive: true,
                onConfirm: async () => {
                    const res = await fetch(`http://localhost:8080/api/pharmacies/${id}/remove`, { method: 'POST' });
                    if (res.ok) fetchPharmacy();
                }
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!pharmacy) return <div>Pharmacy not found.</div>;

    const isActive = pharmacy.status === 'ACTIVE';
    const isSuspended = pharmacy.status === 'SUSPENDED';
    const isRemoved = pharmacy.status === 'REMOVED';

    return (
        <div className="p-6 space-y-6">
            <button onClick={() => navigate('/pharmacy')} className="flex items-center text-gray-500 mb-4">
                <FiArrowLeft className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{pharmacy.pharmacyName}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={pharmacy.status} />
                            <span className="text-sm text-gray-500">ID: #{pharmacy.id}</span>
                        </div>
                    </div>
                    <div className="space-x-2">
                        {!isRemoved && (
                            <button onClick={() => setShowUpdatePanel(true)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                                <FiEdit2 className="inline mr-2" /> Update
                            </button>
                        )}
                        {isActive && (
                            <button onClick={() => openModal('SUSPEND')} className="px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50">
                                <FiSlash className="inline mr-2" /> Suspend
                            </button>
                        )}
                        {isSuspended && (
                            <button onClick={() => openModal('ACTIVATE')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <FiPlay className="inline mr-2" /> Activate
                            </button>
                        )}
                        {!isRemoved && (
                            <button onClick={() => openModal('REMOVE')} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                                <FiTrash2 className="inline mr-2" /> Remove
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                        <div className="text-sm space-y-2">
                            <div><span className="text-gray-500">Type:</span> {pharmacy.pharmacyType}</div>
                            <div><span className="text-gray-500">License:</span> {pharmacy.licenseNumber}</div>
                            <div><span className="text-gray-500">District:</span> {pharmacy.district}</div>
                            <div><span className="text-gray-500">Address:</span> {pharmacy.address}</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                        <div className="text-sm space-y-2">
                            <div><span className="text-gray-500">Owner:</span> {pharmacy.ownerName}</div>
                            <div><span className="text-gray-500">Email:</span> {pharmacy.email}</div>
                            <div><span className="text-gray-500">Phone:</span> {pharmacy.phone}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Placeholders for Linked Info - Inventory & Reservations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Inventory Snapshot</h3>
                    <p className="text-gray-500 text-sm">Inventory list will be displayed here.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Reservations Snapshot</h3>
                    <p className="text-gray-500 text-sm">Recent reservations will be displayed here.</p>
                </div>
            </div>

            <UpdatePharmacyPanel
                isOpen={showUpdatePanel}
                onClose={() => setShowUpdatePanel(false)}
                pharmacy={pharmacy}
                onUpdate={fetchPharmacy}
            />

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                actionLabel={modalConfig.actionLabel}
                isDestructive={modalConfig.isDestructive}
            />
        </div>
    );
};

export default PharmacyDetails;
