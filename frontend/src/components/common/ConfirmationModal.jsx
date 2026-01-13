import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, actionLabel, isDestructive = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-fade-in">
                <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        <FiAlertTriangle size={24} />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-center text-gray-600 text-sm mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`flex-1 py-2 text-white rounded-lg transition-colors font-medium
                            ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
                        `}
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
