import React from 'react';
import NotificationBell from './NotificationBell';

export default function Header({ title }) {
    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <div className="flex items-center gap-6">
                <NotificationBell />
            </div>
        </header>
    )
}
