import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const CivilianLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Main Content Area */}
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default CivilianLayout;
