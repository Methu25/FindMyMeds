import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const CivilianLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default CivilianLayout;
