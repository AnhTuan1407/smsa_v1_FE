import React from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('tokenUser');

    if (token) {
        toast.error('Thông báo: Bạn đã đăng nhập rồi!', {
        });
        return <Navigate to="/" />;
    }

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};

export default PublicRoute;
