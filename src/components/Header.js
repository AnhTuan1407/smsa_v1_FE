import React, { useEffect, useState } from 'react';
import '../styles/css/partials/header.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const dropdownRef = React.useRef(null);
    const userInfoRef = React.useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            userInfoRef.current && !userInfoRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);



    return (
        <>
            <div id="wrapper-header">
                <div className="header-container">
                    <div className="logo">
                        <a href="/api/site/home">
                            <img
                                className="img-logo"
                                src="/images/logo_30shine_new.7135aeb8.png"
                                alt="Loading..."
                            />
                        </a>
                    </div>
                    <div className="nav-bar-menu">
                        <div className="link-item-1"><a href="/">Trang chủ</a></div>
                        <div className="link-item-2"><a href="/about-us">Về SmSa</a></div>
                        <div className="link-item-3"><a href="/system-salon">Tìm SmSa gần nhất</a></div>
                        <div className="link-item-4"><a href="">Học cắt tóc</a></div>
                        <div className="link-item-5"><a href="">Nhượng quyền</a></div>
                        <div className="link-item-6"><a href="">Đối tác</a></div>
                    </div>
                    <div className="auth-menu">
                        {!user ? (
                            <>
                                <div className="auth-item-1"><a href="/register">Đăng ký</a></div>
                                <div className="auth-item-2"><a href="/login">Đăng nhập</a></div>
                            </>
                        ) : (
                            <>
                                <div className="auth-item-3"><a href="#" onClick={logout}>Đăng xuất</a></div>
                                <div className="user-info" onClick={toggleDropdown} ref={userInfoRef}>
                                    <img
                                        src="/images/user-avatar-reloaded.png"
                                        alt="Loading"
                                        className="avt-user"
                                    />
                                    {user.username && (
                                        <span className='username'>{user.username}</span>
                                    )}
                                </div>

                                {isDropdownVisible && (
                                    <div className="dropdown-menu" id="dropdownMenu" ref={dropdownRef}>
                                        <a href="#">Trang cá nhân</a>
                                        <a href="#">Thay đổi mật khẩu</a>
                                        <a href="#">Đặt lịch cắt tóc</a>
                                        <a href="#" onClick={logout}>Đăng xuất</a>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Header;
