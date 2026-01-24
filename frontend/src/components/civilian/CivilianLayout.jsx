import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const CivilianLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-[250px] transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default CivilianLayout;
