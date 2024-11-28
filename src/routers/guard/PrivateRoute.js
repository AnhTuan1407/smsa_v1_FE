import React from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('tokenUser');
    toast.error('Thông báo: Hãy đăng nhập trước!');
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
