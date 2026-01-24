import React from 'react';
import { Outlet } from 'react-router-dom';

const PharmacyLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Placeholder for Pharmacy Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
                <h1 className="text-xl font-bold text-teal-600">Pharmacy Portal</h1>
                <p className="text-sm text-gray-500">Coming Soon</p>
            </div>

            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default PharmacyLayout;
