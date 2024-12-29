import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/css/staff/layout.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../context/AuthContext';

const StaffLayout = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    return (
        <>
            {/* Sidebar */}
            <div className="sidebar-homepagestaff">
                <img onClick={() => navigate('/staff')}
                    alt="SMSA Logo"
                    height="100"
                    src="/images/logo/logosidebar.svg"
                    width="200"
                />
                <h2>Staff 1</h2>
                <a href="/staff/profile">
                    <i className="fas fa-id-card-alt"></i>Thông tin cá nhân
                </a>
                <a href="/staff/schedule">
                    <i className="far fa-calendar-check"></i>Lịch trình
                </a>
                <a href="/staff/history">
                    <i className="fas fa-history"></i>Lịch sử làm việc
                </a>
                <a href="/staff/notifications">
                    <i className="far fa-bell"></i>Thông báo
                </a>
                <a href="/staff/messages">
                    <i className="far fa-paper-plane"></i>Tin nhắn
                </a>
                <a href="/staff/appointments">
                    <i className="fas fa-calendar-day"></i>Thông tin cuộc hẹn
                </a>
                <a href="/staff/reviews">
                    <i className="far fa-star"></i>Đánh giá và phản hồi
                </a>
                <a href="#">
                    <i className="fas fa-headset"></i>Liên Hệ
                </a>
                <a href="#">
                    <i className="far fa-life-ring"></i>Hỗ Trợ
                </a>
            </div>

            {/* Header */}
            <div className="header-homepagestaff">
                <input type="text" placeholder="Tìm kiếm" />
                <div className="right-menu-homepagestaff">
                    <select>
                        <option>Việt Nam</option>
                    </select>
                    <i className="far fa-question-circle"></i>
                    <i className="far fa-bell"></i>
                    <i className="fas fa-sliders-h"></i>
                    <button onClick={logout} className="logout-button">
                        <i className="fas fa-sign-out-alt"></i> Đăng xuất
                    </button>
                </div>
            </div>

            {/* Main content */}
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
        </>
    );
};

export default StaffLayout;
