import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../../components/admin/Topbar';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Topbar />
                <main style={{ padding: '20px' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
