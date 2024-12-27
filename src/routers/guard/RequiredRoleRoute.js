import React from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const RequiredRoleRoute = ({ children, requiredRole }) => {
    const role = localStorage.getItem("role");

    if (!role) {
        toast.error('Thông báo: Hãy đăng nhập trước!');
        return <Navigate to="/" replace />;
    }

    if (role !== requiredRole) {
        toast.error('Thông báo: Bạn không có quyền truy cập!');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequiredRoleRoute;
