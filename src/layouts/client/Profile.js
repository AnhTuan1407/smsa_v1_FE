import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as customerService from '../../services/admin/CustomerService';
import '../../styles/css/client/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState({
        NAME: '',
        EMAIL: '',
        PHONE: '',
        ADDRESS: '',
        dateOfBirth: '',
        POINTS: '',
        GENDER: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem('idPerson');
            if (!userId) {
                toast.error("Không tìm thấy thông tin người dùng!");
                return;
            }

            try {
                const response = await customerService.findById(userId);
                if (response) {
                    setUser(response);
                    setEditUser(response);
                } else {
                    toast.error("Không thể tải thông tin người dùng!");
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra khi tải thông tin người dùng: " + error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleSaveClick = async () => {
        const userId = localStorage.getItem('idPerson');
        const updatedUser = {
            address: editUser.ADDRESS,
            customer_id: userId,
            dateOfBirth: editUser.DATE_OF_BIRTH,
            email: editUser.EMAIL,
            name: editUser.NAME,
            phone: editUser.PHONE,
            points: editUser.POINTS,
            gender: editUser.GENDER,
        };
        try {
            const response = await customerService.edit(updatedUser, userId);
            if (response.success) {
                setUser(editUser);
                setIsEditing(false);
                toast.success("Cập nhật thông tin thành công!");
            } else {
                toast.error("Cập nhật thông tin thất bại!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật thông tin: " + error.message);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
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
                            <span>{user.NAME}</span>
                        </div>
                        <div className="info-item-staffinfo">
                            <label>
                                <i className="fas fa-envelope"></i> Email:
                            </label>
                            <span>{user.EMAIL}</span>
                        </div>
                        <div className="info-item-staffinfo">
                            <label>
                                <i className="fas fa-phone"></i> Số điện thoại:
                            </label>
                            <span>{user.PHONE}</span>
                        </div>
                        <div className="info-item-staffinfo">
                            <label>
                                <i className="fas fa-map-marker-alt"></i> Địa chỉ:
                            </label>
                            <span>{user.ADDRESS}</span>
                        </div>
                        <div className="info-item-staffinfo">
                            <label>
                                <i className="fas fa-birthday-cake"></i> Ngày sinh:
                            </label>
                            <span>{user.DATE_OF_BIRTH}</span>
                        </div>
                        <div className="info-item-staffinfo">
                            <label>
                                <i className="fas fa-star"></i> Điểm tích lũy:
                            </label>
                            <span>{user.POINTS}</span>
                        </div>
                    </div>

                </div>
                <div className="button-center-staffinfo" style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button className="change-photo-btn-staffinfo" onClick={handleEditClick}>
                        <i></i> Chỉnh sửa thông tin
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="edit-popup">
                    <div className="edit-popup-content">
                        <h3>Chỉnh sửa thông tin cá nhân</h3>
                        <div className="edit-form">
                            <div className="edit-form-item">
                                <label>Họ và tên:</label>
                                <input
                                    type="text"
                                    name="NAME"
                                    value={editUser.NAME}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-form-item">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    value={editUser.EMAIL}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-form-item">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="PHONE"
                                    value={editUser.PHONE}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-form-item">
                                <label>Địa chỉ:</label>
                                <input
                                    type="text"
                                    name="ADDRESS"
                                    value={editUser.ADDRESS}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-form-item">
                                <label>Ngày sinh:</label>
                                <input
                                    type="date"
                                    name="DATE_OF_BIRTH"
                                    value={editUser.DATE_OF_BIRTH}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-form-item">
                                <label>Điểm tích lũy:</label>
                                <input
                                    type="text"
                                    name="POINTS"
                                    value={editUser.POINTS}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="edit-popup-buttons">
                            <button onClick={handleSaveClick}>Xác nhận</button>
                            <button onClick={() => setIsEditing(false)}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;