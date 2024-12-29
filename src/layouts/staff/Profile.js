import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as staffService from '../../services/admin/StaffService';
import * as locationService from "../../services/admin/LocationService";
import '../../styles/css/staff/profile.css';

const Profile = () => {
    const [staff, setStaff] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchStaffProfile = async () => {
            const staffId = localStorage.getItem('idPerson');
            if (!staffId) {
                toast.error("Không tìm thấy thông tin nhân viên!");
                return;
            }

            try {
                const response = await staffService.findById(staffId);
                if (response) {
                    setStaff(response);
                } else {
                    toast.error("Không thể tải thông tin nhân viên!");
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra khi tải thông tin nhân viên: " + error.message);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await locationService.findAll();
                if (response) {
                    setLocations(response);
                } else {
                    console.error('Unable to load location list!');
                }
            } catch (error) {
                toast.error("Error loading location list: " + error.message);
            }
        };

        fetchStaffProfile();
        fetchLocations();
    }, []);

    const getLocationName = (locationId) => {
        const location = locations.find(loc => loc.LOCATION_ID === locationId);
        return location ? location.NAME : 'Unknown';
    };

    if (!staff) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="content-staffinfo">
                <div className="staff-info-staffinfo">
                    <h2 className="info-title-staffinfo">
                        <i className="fas fa-user-circle"></i> Thông tin cá nhân
                    </h2>
                    <div className="info-container-staffinfo">
                        <div className="info-grid-staffinfo">
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-user"></i> Họ và tên:
                                </label>
                                <span>{staff.NAME}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-envelope"></i> Email:
                                </label>
                                <span>{staff.EMAIL}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-map-marker-alt"></i> Địa chỉ:
                                </label>
                                <span>{staff.ADDRESS}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-phone"></i> Số điện thoại:
                                </label>
                                <span>{staff.PHONE}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-user-tag"></i> Vai trò:
                                </label>
                                <span>{staff.ROLE}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-star"></i> Đánh giá:
                                </label>
                                <span>{staff.RATING}</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-building"></i> Nơi làm việc:
                                </label>
                                <span>{getLocationName(staff.LOCATION_ID)}</span>
                            </div>
                        </div>
                        <div className="profile-image-staffinfo">
                            <img src={`data:image/png;base64,${staff.IMAGE}`} alt="Staff Profile" />
                            <div className="change-photo-wrapper-staffinfo">
                                <button className="change-photo-btn-staffinfo">Thay đổi ảnh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;