import React from 'react';
import { Outlet } from 'react-router-dom';
import CivilianNavbar from './CivilianNavbar';

const CivilianLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans">
            <CivilianNavbar />
            <main className="flex-1 overflow-y-auto mt-16 p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default CivilianLayout;
