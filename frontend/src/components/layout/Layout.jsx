import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Sidebar />
            <main style={{
                marginLeft: 'calc(var(--sidebar-width) + 2rem)',
                marginRight: '320px', // Space for right sidebar (280px + padding)
                padding: '2.5vh 1rem 2.5vh 0', // Reduced right padding
                width: '100%'
            }}>
                <Outlet />
            </main>
            <RightSidebar />
        </div>
    );
};

export default Layout;
